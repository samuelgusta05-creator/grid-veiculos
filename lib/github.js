import { Octokit } from "@octokit/rest";

const OWNER = process.env.GITHUB_REPO_OWNER || "samuelgusta05-creator";
const REPO = process.env.GITHUB_REPO_NAME || "grid-veiculos";
const BRANCH = process.env.GITHUB_REPO_BRANCH || "master";

function client() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN não configurado");
  return new Octokit({ auth: token });
}

export async function readJsonFile(path, fallback) {
  try {
    const octokit = client();
    const res = await octokit.repos.getContent({ owner: OWNER, repo: REPO, path, ref: BRANCH });
    const content = Buffer.from(res.data.content, "base64").toString("utf-8");
    return { data: JSON.parse(content), sha: res.data.sha };
  } catch (err) {
    if (err.status === 404) return { data: fallback, sha: null };
    throw err;
  }
}

export async function writeJsonFile(path, data, message) {
  const octokit = client();
  const { sha } = await readJsonFile(path, null);
  const content = Buffer.from(JSON.stringify(data, null, 2), "utf-8").toString("base64");
  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    message,
    content,
    sha: sha || undefined,
    branch: BRANCH,
  });
}

export async function writeBinaryFile(path, base64Content, message) {
  const octokit = client();
  let sha;
  try {
    const res = await octokit.repos.getContent({ owner: OWNER, repo: REPO, path, ref: BRANCH });
    sha = res.data.sha;
  } catch (err) {
    if (err.status !== 404) throw err;
  }
  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    message,
    content: base64Content,
    sha,
    branch: BRANCH,
  });
}
