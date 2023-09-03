export const initialDataOfTableSources = {
    "query": {
        "id": "bi_table_sources",
        "source": "bi_table_sources",
        "fields": [
            {
                "column": "id",
                "format": "number",
                "type": "number"
            },
            {
                "column": "name",
                "format": "text",
                "type": "text"
            },
            {
                "column": "table_name",
                "format": "text",
                "type": "text"
            },
            {
                "column": "state",
                "format": "number",
                "type": "number"
            }
        ],
        "filters": []
    }
};
export const initialDataOfTableSourcesColumns = {
    "query": {
        "id": "bi_table_sources_columns",
        "source": "bi_table_sources_columns",
        "fields": [
            {
                "column": "id",
                "format": "number",
                "type": "number"
            },
            {
                "column": "table_source_id",
                "format": "number",
                "type": "number"
            },
            {
                "column": "is_filterable",
                "format": "text",
                "type": "text"
            },
            {
                "column": "is_comparable",
                "format": "text",
                "type": "text"
            },
            {
                "column": "column_name",
                "format": "text",
                "type": "text"
            },
            {
                "column": "column_description",
                "format": "text",
                "type": "text"
            },
            {
                "column": "state",
                "format": "number",
                "type": "number"
            },
            {
                "column": "column_format",
                "format": "text",
                "type": "text"
            },
            {
                "column": "column_type",
                "format": "text",
                "type": "text"
            }
        ],
        "filters": []
    }
};