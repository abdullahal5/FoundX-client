/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/self-closing-comp */
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Suspense } from "react";

import Container from "../UI/Container";

import { getRecentPosts } from "@/src/services/RecentPosts";
import Card from "../UI/Card";
import { IPost } from "@/src/types";

const RecentPosts = async () => {
  const { data: posts } = await getRecentPosts();

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Container>
          <div className="section-title my-8">
            <h2 className="mb-2 text-center text-2xl">Recently Found Items</h2>
            <p className="text-center">
              A list of items that have been recently found and reported
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="my-8 grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-4">
              {posts.map((item: IPost) => (
                <Card key={item._id} post={item} />
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className="rounded-md bg-default-900 text-default"
              size="md"
            >
              <Link href={"/found-items"}>See All</Link>
            </Button>
          </div>
        </Container>
      </Suspense>
    </div>
  );
};

export default RecentPosts;
