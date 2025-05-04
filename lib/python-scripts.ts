const extractSchema = `
def extract_csv_schema(url: str):
    try:
        # Read CSV from URL
        df = pd.read_csv(url)

        # Extract schema: column names and data types
        schema = {
            "columns": [
                {"name": col, "dtype": str(df[col].dtype)} for col in df.columns
            ]
        }

        # Extract sample data (max 5 rows)
        sample_data = df.head(5).to_dict(orient="records")

        # Combine and return
        return {
            "schema": schema,
            "sample_data": sample_data
        }

    except Exception as e:
        return {"error": str(e)}
`;

export { extractSchema };
