export type GetProjectsResponseBody = {
  pagination: {};
};
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
  readyState: ReadyState;
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

export type ReadyState =
  | "BUILDING"
  | "ERROR"
  | "INITIALIZING"
  | "QUEUED"
  | "READY"
  | "CANCELED";

export type DevelopmentEvent = {
  created: number;
  date: number;
  deploymentId: string;
  id: string;
  text: string;
  type: DevelopmentEventType;
  serial: string;
  info: Info;
};

export type DevelopmentEventType = "stderr" | "stdout";

export type Info = {
  type: string;
  name: string;
  entrypoint: string;
};

export type Alias = {
  uid: string;
  alias: string;
  created: Date;
  redirect: null;
};

export type GetDeploymentsResponseBody = {
  deployments: Deployment[];
  pagination: Pagination;
};

export type Deployment = {
  uid: string;
  name: string;
  projectId: string;
  url: string;
  created: number;
  source: string;
  state: ReadyState;
  readyState: ReadyState;
  readySubstate: ReadyState;
  type: string;
  creator: Creator;
  inspectorUrl: string;
  meta: Meta;
  target: string | null;
  aliasError: null;
  aliasAssigned: number;
  isRollbackCandidate: boolean;
  createdAt: number;
  buildingAt: number;
  ready: number;
};

export type Pagination = {
  count: number;
  next: number;
  prev: number;
};

export type GetTeamsResponseBody = {
  teams: Team[];
  pagination: Pagination;
};

export type Team = {
  id: string;
  slug: string;
  name: string;
  // avatar?: string;
  createdAt: number;
  created: Date;
  membership: Membership;
  enableImageOptimizationNewPrice: boolean;
  // enablePreviewFeedback: null;
  // enableProductionFeedback: null;
  sensitiveEnvironmentVariablePolicy: string;
  isMigratingToSensitiveEnvVars: boolean;
  creatorId: string;
  updatedAt: number;
  // platformVersion: null;
  billing: Billing;
  // description: null;
  profiles: any[];
  stagingPrefix: string;
  // resourceConfig: ResourceConfig;
  // previewDeploymentSuffix: null;
  // softBlock: null;
  // blocked: null;
  remoteCaching: RemoteCaching;
  enabledInvoiceItems: EnabledInvoiceItems;
  // featureBlocks: FeatureBlocks;
  spaces: RemoteCaching;
  createdDirectToHobby: boolean;
};

export type Billing = {
  address: null;
  cancelation: null;
  email: string;
  language: null;
  name: string;
  platform: string;
  period: null;
  plan: string;
  tax: null;
  currency: string;
  trial: null;
  invoiceItems: null;
  status: string;
  planIteration: string;
  billingVersion: number;
  plusMigrationEnabled: boolean;
};

export type EnabledInvoiceItems = {
  vercelMarketplace: RemoteCaching;
};

export type RemoteCaching = {
  enabled: boolean;
};

export type Membership = {
  role:
    | "OWNER"
    | "MEMBER"
    | "DEVELOPER"
    | "SECURITY"
    | "BILLING"
    | "VIEWER"
    | "VIEWER_FOR_PLUS"
    | "CONTRIBUTOR";
  confirmed: boolean;
  created: number;
  createdAt: number;
  teamId: string;
  updatedAt: number;
};

export type GetDomainsResponseBody = {
  domains: Domain[];
  pagination: Pagination;
};

export type Domain = {
  verified: boolean;
  nameservers: string[];
  intendedNameservers: string[];
  customNameservers: string[];
  creator: DomainCreator;
  registrar: string;
  teamId: string;
  createdAt: number;
  boughtAt: number;
  expiresAt: number;
  id: string;
  name: string;
  orderedAt: number;
  renew: boolean;
  serviceType: string;
  transferredAt: number;
  transferStartedAt: number;
  userId: string;
};

export type DomainCreator = {
  id: string;
  username: string;
  email: string;
};

export type GetUserResponseBody = {
  user: User;
};

export type User = {
  createdAt: number;
  softBlock: SoftBlock;
  billing: Billing;
  resourceConfig: UserResourceConfig;
  stagingPrefix: string;
  activeDashboardViews: ActiveDashboardView[];
  importFlowGitNamespace: string;
  importFlowGitNamespaceId: string;
  importFlowGitProvider: string;
  preferredScopesAndGitNamespaces: PreferredScopesAndGitNamespace[];
  dismissedToasts: DismissedToast[];
  favoriteProjectsAndSpaces: FavoriteProjectsAndSpace[];
  hasTrialAvailable: boolean;
  remoteCaching: UserRemoteCaching;
  dataCache: DataCache;
  featureBlocks: FeatureBlocks;
  id: string;
  email: string;
  name: string;
  username: string;
  avatar: string;
  defaultTeamId: string;
};

export type ActiveDashboardView = {
  scopeId: string;
  viewPreference: string;
  favoritesViewPreference: string;
  recentsViewPreference: string;
};

export type DataCache = {
  excessBillingEnabled: boolean;
};

export type DismissedToast = {
  name: string;
  dismissals: Dismissal[];
};

export type Dismissal = {
  scopeId: string;
  createdAt: number;
};

export type FavoriteProjectsAndSpace = {
  teamId: string;
  projectId: string;
};

export type FeatureBlocks = {
  webAnalytics: WebAnalytics;
};

export type PreferredScopesAndGitNamespace = {
  scopeId: string;
  gitNamespaceId: string;
};

export type UserRemoteCaching = {
  enabled: boolean;
};

export type UserResourceConfig = {
  nodeType: string;
  concurrentBuilds: number;
  elasticConcurrencyEnabled: boolean;
  buildEntitlements: BuildEntitlements;
  buildQueue: BuildQueue;
  awsAccountType: string;
  awsAccountIds: string[];
  cfZoneName: string;
  imageOptimizationType: string;
  edgeConfigs: number;
  edgeConfigSize: number;
  edgeFunctionMaxSizeBytes: number;
  edgeFunctionExecutionTimeoutMs: number;
  serverlessFunctionMaxMemorySize: number;
  kvDatabases: number;
  postgresDatabases: number;
  blobStores: number;
  integrationStores: number;
  cronJobs: number;
  cronJobsPerProject: number;
  microfrontendGroupsPerTeam: number;
  microfrontendProjectsPerGroup: number;
  flagsExplorerOverridesThreshold: number;
  flagsExplorerUnlimitedOverrides: boolean;
  customEnvironmentsPerProject: number;
  buildMachine: BuildMachine;
  security: Security;
};

export type BuildEntitlements = {
  enhancedBuilds: boolean;
};

export type BuildMachine = {
  purchaseType: string;
  isDefaultBuildMachine: boolean;
  cores: number;
  memory: number;
};

export type BuildQueue = {
  configuration: string;
};

export type Security = {
  customRules: number;
  ipBlocks: number;
  ipBypass: number;
  rateLimit: number;
};

export type SoftBlock = {
  blockedAt: number;
  reason: string;
  blockedDueToOverageType: string;
};
