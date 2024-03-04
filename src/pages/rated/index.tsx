import { useState } from "react";
import { Container, Header, Loader, Menu, Segment } from "semantic-ui-react";
import { DisplayType } from "../home";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTvShows } from "./query";
import { ColumnDisplay } from "../home/column-display";
import { Navigate } from "react-router-dom";
import "./styles.css";

export const Rated = () => {
  const [activeTabs, setActiveTabs] = useState<DisplayType>(DisplayType.Movies);

  const { data: ratedMovies, isLoading: isLoadingRatedMovies } = useQuery({
    queryKey: ["ratedMovies"],
    queryFn: fetchRatedMovies,
  });

  const { data: ratedTvShows, isLoading: isLoadingRatedTvShows } = useQuery({
    queryKey: ["ratedTvShows"],
    queryFn: fetchRatedTvShows,
  });

  if (isLoadingRatedMovies || isLoadingRatedTvShows) {
    return <Loader active />;
  }

  if (localStorage.getItem("guest_session_id") === null) {
    return <Navigate to="/auth" />;
  }

  return (
    <Container style={{ marginTop: 50, backgroundColor: "#052626" }}>
      <Menu pointing secondary color="brown">
        <Menu.Item
          name="Movies"
          active={activeTabs === DisplayType.Movies}
          onClick={() => setActiveTabs(DisplayType.Movies)}
          style={{ color: "#c6a867" }}
        />
        <Menu.Item
          name="TV Shows"
          active={activeTabs === DisplayType.TvShows}
          onClick={() => setActiveTabs(DisplayType.TvShows)}
          style={{ color: "#c6a867" }}
        />
      </Menu>

      <Segment>
        {activeTabs === DisplayType.Movies ? (
          ratedMovies && ratedMovies.results ? (
            <div>
              <Header as={"h2"}>Rated Movies</Header>
              <ColumnDisplay
                data={ratedMovies.results}
                displayType={DisplayType.Movies}
                isRated
              />
            </div>
          ) : (
            <div>
              <Header as={"h2"}>No movies have been rated yet</Header>
            </div>
          )
        ) : ratedTvShows && ratedTvShows.results ? (
          <div>
            <Header as={"h2"}>Rated TV Shows</Header>
            <ColumnDisplay
              data={ratedTvShows.results}
              displayType={DisplayType.TvShows}
              isRated
            />
          </div>
        ) : (
          <div>
            <Header as={"h2"}>No TV Shows have been rated yet</Header>
          </div>
        )}
      </Segment>
    </Container>
  );
};
