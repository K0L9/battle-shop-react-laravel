import * as LoginActionCreators from "../../components/auth/login/actions"
import * as RegisterActionCreators from "../../components/auth/register/actions"

export default {
    ...RegisterActionCreators, ...LoginActionCreators
}