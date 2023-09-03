interface Field {
    column: string;
    format: string;
    type: string;
}

interface Filter {
    column: string;
    value: Array<string>;
    operator: string;
    dataType: string;
}

export interface ISendingDataToServer {
    id: string;
    source: string;
    fields: Array<Field>;
    filters: Array<Filter>;
}
export interface SendQueryAction {
    type: string;
    payload: {
        // Define the payload structure for the SendQueryAction
        // For example, if you have a query field in the payload:
        query: string;
        // Add other fields related to the query action if needed
    };
}

