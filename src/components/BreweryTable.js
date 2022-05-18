import "./BreweryTable.css";

export const BreweryTable = ({ breweries }) => {
  return (
    <table className="breweryTableContainer">
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>State</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {breweries.map((brewery) => {
          return (
            <tr key={brewery.id}>
              <td>{brewery.name}</td>
              <td>{brewery.city}</td>
              <td>{brewery.state}</td>
              <td>
                {brewery.website_url ? (
                  <a
                    href={brewery.website_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {brewery.website_url}
                  </a>
                ) : (
                  "not available"
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
