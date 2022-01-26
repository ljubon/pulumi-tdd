import * as pulumi from "@pulumi/pulumi";

pulumi.runtime.setMocks({
    newResource: function (args: pulumi.runtime.MockResourceArgs): { id: string, state: any } {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function (args: pulumi.runtime.MockCallArgs) {
        return args.inputs;
    },
});


describe("When provisioning a static website", () => {
    let infra: typeof import("../index");

    beforeAll(async function () {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("../index");
    })

    it("A storage account should be created", () => {
        expect(infra.storageAccount).toBeDefined();
    });

    it("The storage account should only allow https traffic", function (done) {
        infra.storageAccount.enableHttpsTrafficOnly.apply(enableHttpsTrafficOnly => {
            if (!enableHttpsTrafficOnly) {
                done(new Error(`storageAccount.enableHttpsTrafficOnly should be true`));
            } else {
                done();
            }
        });
    });

    it("A Storage Account Static Website should be created", () => {
        expect(infra.staticWebsite).toBeDefined();
    });

    it("A Storage Account Static Website should be created", () => {
        expect(infra.staticWebsite).toBeDefined();
    });

});