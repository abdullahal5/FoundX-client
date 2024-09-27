"use client";
import { Avatar } from "@nextui-org/react";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@nextui-org/button";

import ClaimRequestModal from "../../modals/ClaimRequestModal";

import ImageGallery from "./ImageGallery";

import { IPost } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import AuthenticationModal from "../../modals/AuthenticationModal";

interface IProps {
  post: IPost;
}

const Post = ({ post }: IProps) => {
  const { title, dateFound, description, location, city, _id, images, user } =
    post || {};

  const { user: loggedInUser } = useUser();

  return (
    <div className="mb-2 rounded-md bg-default-100 p-4">
      <div className="border-b border-default-200 pb-2">
        <div className="flex items-center justify-between border-b border-default-200 pb-4">
          <div className="flex items-center gap-3">
            <Avatar
              isBordered
              name={user?.name}
              radius="sm"
              src={user?.profilePhoto}
            />
            <div>
              <p>{user?.name}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="border-b border-default-200 py-4">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Link href={`/found-items/${_id}`}>
                <h1 className="cursor-pointer text-2xl">{title}</h1>
              </Link>
              <p className="flex items-center gap-1 text-xs">
                Found on: <Calendar width={14} />
                {format(new Date(dateFound), "dd MMM, yyyy")}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-1">
                <MapPin width={18} />
                {location}, {city}
              </p>
            </div>
          </div>
          <p>{description}</p>
        </div>

        <ImageGallery images={images} />

        <div className="mt-4 flex gap-5">
          {user?.email !== loggedInUser?.email && (
            <>
              <div className="flex-1">
                {loggedInUser?.email && (
                  <ClaimRequestModal _id={_id} questions={post?.questions} />
                )}
                {!loggedInUser?.email && <AuthenticationModal id={_id} />}
              </div>
            </>
          )}
          {user?.email !== loggedInUser?.email && (
            <div className="w-[1px] bg-default-200" />
          )}
          <Button className="flex-1 w-full" variant="light">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;
