import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPlaces = () => {

  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //const [creatorUser, setCreatorUser] = useState({});

  const params = useParams();
  //console.log(params, 'params obj');
  const userId = params.userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
        //setCreatorUser(responseData.creator);
        setLoadedPlaces(responseData.places);
        console.log(responseData)
      } catch (err) {
        console.log(err, 'logging userPlaces error FE');
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) => prevPlaces.filter(place => place.id !== deletedPlaceId));
  };
  //console.log(`Places left after deleting ----- ${loadedPlaces.length}`)
  //console.log(creatorUser, "user places creator obj")
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} /* userCreator={creatorUser} */ onDeletePlace={placeDeletedHandler} />}
    </React.Fragment>
  );
};

export default UserPlaces;
