export const USER_REQUEST = "list request";
export const USER_SUCCESS = "list success";
export const USER_FAILED = "list failed";

export class ListRequest {
    readonly type = USER_REQUEST;
}

export class ListSuccess {
    readonly type = USER_SUCCESS;
    constructor(public payload?: { data: any }) { }
}

export class ListFailed {
    readonly type = USER_FAILED;
}