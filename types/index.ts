export type Project = {
  accountId: string;
  speedInsights: SpeedInsights;
  autoExposeSystemEnvs: boolean;
  autoAssignCustomDomains: boolean;
  autoAssignCustomDomainsUpdatedBy: string;
  buildCommand: null;
  createdAt: number;
  crons: Crons;
  devCommand: null;
  directoryListing: boolean;
  env: Env[];
  framework: string;
  gitForkProtection: boolean;
  gitLFS: boolean;
  id: string;
  installCommand: null;
  lastRollbackTarget: null;
  lastAliasRequest: null;
  name: string;
  nodeVersion: string;
  outputDirectory: null;
  productionDeploymentsFastLane: boolean;
  publicSource: null;
  defaultResourceConfig: DefaultResourceConfig;
  resourceConfig: ResourceConfig;
  rootDirectory: null;
  serverlessFunctionRegion: string;
  sourceFilesOutsideRootDirectory: boolean;
  ssoProtection: SsoProtection;
  updatedAt: number;
  live: boolean;
  gitComments: GitComments;
  gitProviderOptions: GitProviderOptions;
  webAnalytics: WebAnalytics;
  oidcTokenConfig: OidcTokenConfig;
  link: Link;
  latestDeployments: LatestDeployment[];
  targets: Targets;
  deploymentExpiration: DeploymentExpiration;
  features: Features;
};

export type Crons = {
  enabledAt: number;
  disabledAt: null;
  updatedAt: number;
  deploymentId: string;
  definitions: any[];
};

export type DefaultResourceConfig = {
  fluid: boolean;
  functionDefaultRegions: string[];
  functionDefaultTimeout: number;
  functionDefaultMemoryType: string;
  functionZeroConfigFailover: boolean;
  elasticConcurrencyEnabled: boolean;
};

export type DeploymentExpiration = {
  expirationDays: number;
  expirationDaysProduction: number;
  expirationDaysCanceled: number;
  expirationDaysErrored: number;
  deploymentsToKeep: number;
};

export type Env = {
  target: string[];
  configurationId: null;
  comment: string;
  customEnvironmentIds: any[];
  id: string;
  key: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: null;
  type: string;
  value: string;
};

export type Features = {
  webAnalytics: boolean;
};

export type GitComments = {
  onCommit: boolean;
  onPullRequest: boolean;
};

export type GitProviderOptions = {
  createDeployments: string;
};

export type LatestDeployment = {
  alias: string[];
  aliasAssigned: number;
  aliasError: null;
  automaticAliases: string[];
  builds: any[];
  createdAt: number;
  createdIn: string;
  creator: Creator;
  deploymentHostname: string;
  forced: boolean;
  id: string;
  meta: Meta;
  name: string;
  plan: string;
  private: boolean;
  readyState: string;
  readySubstate: string;
  target: string;
  teamId: string;
  type: string;
  url: string;
  userId: string;
  withCache: boolean;
  buildingAt: number;
  readyAt: number;
  previewCommentsEnabled: boolean;
  oidcTokenClaims: OidcTokenClaims;
};

export type Creator = {
  uid: string;
  email: string;
  username: string;
  githubLogin: string;
};

export type Meta = {
  githubCommitAuthorName: string;
  githubCommitAuthorEmail: string;
  githubCommitMessage: string;
  githubCommitOrg: string;
  githubCommitRef: string;
  githubCommitRepo: string;
  githubCommitSha: string;
  githubDeployment: string;
  githubOrg: string;
  githubRepo: string;
  githubRepoOwnerType: string;
  githubCommitRepoId: string;
  githubRepoId: string;
  githubRepoVisibility: string;
  githubHost: string;
  githubCommitAuthorLogin: string;
  repoPushedAt: string;
  branchAlias: string;
};

export type OidcTokenClaims = {
  sub: string;
  iss: string;
  scope: string;
  aud: string;
  owner: string;
  owner_id: string;
  project: string;
  project_id: string;
  environment: string;
};

export type Link = {
  type: string;
  repo: string;
  repoId: number;
  org: string;
  repoOwnerId: number;
  gitCredentialId: string;
  productionBranch: string;
  sourceless: boolean;
  createdAt: number;
  updatedAt: number;
  deployHooks: any[];
};

export type OidcTokenConfig = {
  enabled: boolean;
  issuerMode: string;
};

export type ResourceConfig = {
  fluid: boolean;
  functionDefaultRegions: string[];
};

export type SpeedInsights = {
  id: string;
  hasData: boolean;
  enabledAt: number;
};

export type SsoProtection = {
  deploymentType: string;
};

export type Targets = {
  production: LatestDeployment;
};

export type WebAnalytics = {
  id: string;
  enabledAt: number;
};
