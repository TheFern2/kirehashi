import { Octokit } from "@octokit/rest";
import { BriefGist } from "../interfaces/BriefGist";

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
          description: gist.description!,
          updated_at: gist.updated_at,
          html_url: gist.html_url,
        };

        return gistObj;
      })
    );

    return result;
  };

  compareGistsArray = (arr1: Array<BriefGist>, arr2: Array<BriefGist>) => {
    let count = 0;
    let gistsNotMatching = [];
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (
          arr1[i].updated_at === arr2[j].updated_at &&
          arr1[i].id === arr2[j].id
        ) {
          count++;
        } else if (
          arr1[i].updated_at !== arr2[j].updated_at &&
          arr1[i].id === arr2[j].id
        ) {
          gistsNotMatching.push(arr1[i]);
        }
      }
    }

    const result = {
      isEqual:
        arr1.length === arr2.length && count === arr1.length ? true : false,
      gistsNotMatching: gistsNotMatching,
    };

    return result;
  };
}
