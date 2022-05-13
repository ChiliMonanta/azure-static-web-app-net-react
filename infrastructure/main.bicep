param location string
param appName string
param skuName string = 'Free'
param skuTier string = 'Free'

resource staticWebApp 'Microsoft.Web/staticSites@2021-02-01' = {
  name: appName
  location: location
  tags: {
    environment: 'tagValue1'
    build: 'tagValue2'
  }
  sku: {
    name: skuName
    tier: skuTier
  }
  properties: {
    allowConfigFileUpdates: true
    stagingEnvironmentPolicy: 'Enabled'
    buildProperties: {
      skipGithubActionWorkflowGeneration: true
    }
  }
}
