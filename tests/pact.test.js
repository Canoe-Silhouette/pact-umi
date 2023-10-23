// This is the Pact test for the cy-consumer

import {data} from './overview'

const { pactWith } = require("jest-pact")

const axios = require("axios")

let getData;
getData = endpoint => {
  return axios.request({
    method: "GET",
    baseURL: endpoint,
    url: "/test",
    params:{
      businessGroupId:1
    },
    headers: { Accept: "application/json",
    "X-Auth-Token":"test"},
  })
}

pactWith({ consumer: "web", provider: "adapter" }, provider => {
    // This is the body we expect to get back from the provider
    const EXPECTED_BODY = data

    describe("get /test", () => {
        beforeEach(() => {
            // First we setup the expected interactions that should occur during the test
            const interaction = {
                state: "get a list of xxx",
                uponReceiving: "a request for xxxx",
                withRequest: {
                    method: "GET",
                    path: "/test",
                    params:{
                      businessGroupId:1
                    },
                    headers: {
                        Accept: "application/json",
                        "X-Auth-Token":"test"
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: EXPECTED_BODY,
                },
            }

            return provider.addInteraction(interaction)
        })

        it("returns the correct response", () => {
            getData(provider.mockService.baseUrl).then( response => {
                console.log(response)
                return expect(response.data.res[0]).toHaveProperty("ciId")

            })
        })
    })

})
