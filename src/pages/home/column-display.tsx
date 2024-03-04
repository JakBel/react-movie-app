import { Card, Grid, Form, Label } from "semantic-ui-react";
import { DisplayType } from ".";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rateMovie, rateTvShow } from "./mutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date: string;
  rating?: number;
}

interface Props {
  data: DisplayData[];
  displayType: DisplayType;
  isRated?: boolean;
}

export const ColumnDisplay = (props: Props) => {
  const { data, displayType, isRated } = props;

  const [rating, setRating] = useState(0);

  const onSuccess = () => {
    toast.success("Successfully rated! :D");
  };

  const onError = () => {
    toast.error("Something went wrong :/");
  };

  const { mutate: rateMovieMutation } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: (id: number) => rateMovie(id, rating),
    onSuccess,
    onError,
  });

  const { mutate: rateTvShowMutation } = useMutation({
    mutationKey: ["rateTvShow"],
    mutationFn: (id: number) => rateTvShow(id, rating),
    onSuccess,
    onError,
  });

  const rate =
    displayType === DisplayType.Movies ? rateMovieMutation : rateTvShowMutation;

  return (
    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded="vertically"
    >
      {data.map((displayData: DisplayData) => (
        <Grid.Column key={displayData.id}>
          <Card.Group>
            <Link
              to={`/${
                displayType === DisplayType.Movies ? "movie" : "tvshow"
              }/${displayData.id}`}
            >
              <Card
                style={{
                  height: 800,
                  backgroundColor: "#21448f",
                }}
                fluid
                // image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                // header={
                //   displayType === DisplayType.Movies
                //     ? displayData.title
                //     : displayData.name
                // }
                // meta={`Release date:${displayData.release_date} | Rating: ${displayData.vote_average}`}
                // description={displayData.overview.slice(0, 350) + "..."}
              >
                <Card.Content>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                    style={{
                      width: "100%",
                      borderRadius: 5,
                      marginBottom: 20,
                    }}
                  />
                  <Card.Header
                    style={{
                      color: "#f5f3c6",
                    }}
                  >
                    {displayType === DisplayType.Movies
                      ? displayData.title
                      : displayData.name}
                  </Card.Header>
                  <Card.Meta
                    style={{
                      color: "#c6a867", 
                    }}
                  >
                    Release date: {displayData.release_date} | Rating:{" "}
                    {displayData.vote_average}
                  </Card.Meta>
                  <Card.Description
                    style={{
                      color: "#f5f3c6", 
                    }}
                  >
                    {displayData.overview.length > 300
                      ? displayData.overview.slice(0, 350) + "..."
                      : displayData.overview}
                  </Card.Description>
                </Card.Content>
              </Card>
              {isRated && <Label> Your Rating : {displayData.rating}</Label>}
            </Link>
            <Form style={{ marginTop: 10 }}>
              <Form.Group inline>
                <Form.Field>
                  <Form.Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    onChange={(e) => setRating(Number(e.target.value))}
                    action={{
                      color: "brown",
                      labelPosition: "right",
                      icon: "check",
                      content: "Rate",
                      onClick: () => {
                        rate(displayData.id);
                      },
                    }}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Card.Group>
        </Grid.Column>
      ))}
    </Grid>
  );
};
