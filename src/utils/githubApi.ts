import { Octokit } from "@octokit/rest";
import { BriefGist } from "../interfaces/BriefGist";
import { DetailedGist } from "../interfaces/DetailedGist";
import { components } from "@octokit/openapi-types";

export type GithubGist = components["schemas"]["gist-simple"];

export class GithubApi {
  private _personalToken: string = "";
  private _octokit: Octokit;

  constructor(personalToken: string) {
    this._octokit = this.getOctokit(personalToken);
    this._personalToken = personalToken;
  }

  private getOctokit = (
    githubPersonalAccessToken: string,
    githubEnterpriseUrl?: string
  ) =>
    new Octokit({
      requestMedia: "application/vnd.github.v3+json",
      auth: githubPersonalAccessToken,
      headers: {
        userAgent: "kirehashi-1.0.0",
        "user-agent": "octokit/rest.js v1.2.3",
        mediaType: {
          format: "application/vnd.github.v3+json",
        },
      },
      ...(githubEnterpriseUrl && { baseUrl: githubEnterpriseUrl }),
    });

  // This is one api call and gets initial gists information
  getBriefGists = async () => {
    const result = await this._octokit.paginate("GET /gists", (res) =>
      res.data.map((gist) => {
        const gistObj: BriefGist = {
          id: gist.id,
          description: gist.description ? gist.description : "",
          created_at: gist.created_at,
          updated_at: gist.updated_at,
          html_url: gist.html_url,
        };

        return gistObj;
      })
    );

    return result;
  };

  // called on very first app launch to get all detailed gists
  getDetailedGists = async () => {
    const briefGists = await this.getBriefGists();
    const gistsPromises: any[] = [];
    briefGists.forEach((gist) => {
      gistsPromises.push(this._octokit.gists.get({ gist_id: gist.id }));
    });

    const detailedGists: GithubGist[] = [];
    const notesPromises = await Promise.allSettled(gistsPromises);
    notesPromises.forEach((response) => {
      if (response.status === "fulfilled") {
        detailedGists.push(response.value.data);
      }
    });
    console.log(detailedGists);
    return detailedGists;
  };

  // test edit, test delete, test add
  // how to know which one is the most updated one?
  // We want to know what to edit, delete, put on localStorage
  compareGistsArray = (
    apiData: Array<BriefGist>,
    localStorage: Array<BriefGist>
  ) => {
    let count = 0;
    let gistsNotMatching = [];
    let compare1: BriefGist[] = [];
    let compare2: BriefGist[] = [];

    // We want compare1 to be larger
    if (apiData.length > localStorage.length) {
      compare1 = apiData;
      compare2 = localStorage;
    } else {
      compare1 = localStorage;
      compare2 = apiData;
    }

    for (let i = 0; i < compare1.length; i++) {
      // need a sanity check if a BriefGist doesn't exist on other array
      const itemFound = compare2.find(
        (element) => element.id === compare1[i].id
      );
      if (!itemFound) {
        gistsNotMatching.push(compare1[i]);
        console.log(`Item found ${compare1[i]}`);
        continue;
      }
      for (let j = 0; j < compare2.length; j++) {
        if (
          compare1[i].updated_at === compare2[j].updated_at &&
          compare1[i].id === compare2[j].id
        ) {
          count++;
        } else if (
          compare1[i].updated_at !== compare2[j].updated_at &&
          compare1[i].id === compare2[j].id
        ) {
          gistsNotMatching.push(compare1[i]);
          console.log(compare1[i]);
        }
      }
    }

    const result = {
      isEqual:
        compare1.length === compare2.length && count === compare1.length
          ? true
          : false,
      gistsNotMatching: gistsNotMatching,
    };

    return result;
  };

  // Return updated array
  compareDetailedGistArray = async (
    apiData: Array<BriefGist>,
    localStorage: Array<GithubGist>
  ) => {
    let newDetailedGistData: GithubGist[] = [];
    let newTestData: string[] = [];
    let countGistCalls = 0;

    for (let index = 0; index < apiData.length; index++) {
      const apiElement = apiData[index];
      const lsElement = localStorage.find(
        (lsElement) => lsElement.id === apiElement.id
      );
      if (!lsElement) {
        // testing without calling api first
        newTestData.push(apiElement.id);
        console.log(`New element: ${apiElement.id} ${apiElement.description}`);

        // New Element test
        try {
          const newGistPromise = [];
          newGistPromise.push(this.getDetailedGist(apiElement.id));
          const response = await Promise.allSettled(newGistPromise);
          countGistCalls++;

          if (response[0].status === "fulfilled") {
            newDetailedGistData.push(response[0].value.data as GithubGist);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log(
          `Existing element found ${apiElement.id} ${apiElement.description}`
        );
        if (lsElement.updated_at === apiElement.updated_at) {
          console.log(
            `Existing element matched date ${apiElement.id} ${apiElement.description}`
          );
          newDetailedGistData.push(lsElement);
        } else {
          console.log(
            `Existing element did not match date ${apiElement.id} ${apiElement.description}`
          );
          // New Element test
          countGistCalls++;
          try {
            const newGistPromise = [];
            newGistPromise.push(this.getDetailedGist(apiElement.id));
            const response = await Promise.allSettled(newGistPromise);

            if (response[0].status === "fulfilled") {
              newDetailedGistData.push(response[0].value.data as GithubGist);
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
    console.log(newDetailedGistData);
    console.log(`Number of detailed gist calls: ${countGistCalls}`);
    return newDetailedGistData;
  };

  // Need functions for single gist operations, get, edit, delete...
  private getDetailedGist = async (gist_id: string) => {
    const gist = await this._octokit.gists.get({
      gist_id: gist_id,
    });
    return gist;
  };
}
