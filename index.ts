import * as azure_native from "@pulumi/azure-native";

const rg = new azure_native.resources.ResourceGroup("static-website-rg");

export const storageAccount = new azure_native.storage.StorageAccount("staticwebsite", {
    resourceGroupName: rg.name,
    enableHttpsTrafficOnly: true,
    sku: {
        name: azure_native.storage.SkuName.Standard_ZRS
    },
    kind: azure_native.storage.Kind.StorageV2,
});

export const staticWebsite = new azure_native.storage.StorageAccountStaticWebsite("staticWebsite", {
    accountName: storageAccount.name,
    resourceGroupName: rg.name,
    indexDocument: "index.html",
    error404Document: "404.html",
});