import React, { useState } from "react";
import OrganizationCardRenderer from "../Components/OrganizationCardRenderer.js";
import organizationData from "../DummyData/organizationsData.js";
import Filter2 from "../Components/OrganizationFilter.js";

const OrganizationsView = (props) => {
  const [currentCardSet, setCurrentCardSet] = useState(organizationData); // Initialize with all data

  return (
    <div className="grid grid-cols-4 max-w-7xl w-full mx-auto">
      <div className="col-span-1 justify-self-start">
        <div className="flex flex-col items-center justify-center gap-4 sticky top-24">
          <Filter2
            data={organizationData}
            setCurrentCardSet={setCurrentCardSet}
          />
        </div>
      </div>
      <div className="col-span-2 mx-4">
        <div className="grid grid-cols-3 place-items-center gap-y-6 auto-rows-fr">
          <OrganizationCardRenderer
            userType={props.userType}
            currentCardSet={currentCardSet} // Pass filtered data
            setCurrentCardSet={setCurrentCardSet} // This may not be necessary here, depending on your implementation in OrganizationCardRenderer
          />
        </div>
      </div>
      <div className="col-span-1">
        {/* Add any content you want to display in the third column here */}
      </div>
    </div>
  );
};

export default OrganizationsView;
