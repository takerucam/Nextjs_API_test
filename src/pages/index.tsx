import { GetStaticProps, NextPage } from "next";
import React from "react";
import { Sample } from "../types/type.d";

type Props = {
  props: Sample[];
};

const Index: NextPage<Props> = ({ props }) => {
  return (
    <React.Fragment>
      <div>
        {props.map((item: Sample) => {
          return (
            <div key={item.name}>
              {item.name} {item.text}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set(
    "X-API-KEY",
    process.env.API_KEY == undefined ? "" : process.env.API_KEY
  );

  const res = await fetch("https://miyakeprivate.microcms.io/api/v1/sample", {
    headers: requestHeaders,
  });
  const data = await res.json();

  return {
    props: {
      props: data.contents,
    },
  };
};

export default Index;
