import React from 'react';
import ResourceCard from './ResourceCard';

const ResourceList = ({ 
  filteredResources, 
  isLoading, 
  isAdmin, 
  editResource, 
  deleteResource 
}) => {
  return (
    <section className="resource-list">
      <h2>Available Resources ({filteredResources.length})</h2>
      
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading resources...</p>
        </div>
      ) : filteredResources.length === 0 ? (
        <p>No resources found. Try another search term or add a new resource.</p>
      ) : (
        <div className="resources-container">
          {filteredResources.map(resource => (
            <ResourceCard 
              key={resource.id}
              resource={resource}
              isAdmin={isAdmin}
              editResource={editResource}
              deleteResource={deleteResource}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ResourceList;