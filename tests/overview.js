import { string} from "@pact-foundation/pact/src/dsl/matchers";
const { MatchersV3} = require('@pact-foundation/pact');
const { atLeastOneLike} = MatchersV3;
export const data = {
    code:0,
    res:[ atLeastOneLike({
        ciId: string("15338503026"),
    })],
    error:null,
    trace:null
}