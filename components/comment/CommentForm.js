import { useState, useRef } from "react";
import InputEmoji from "react-input-emoji";
import Image from "next/image";
import axios from "@/lib/axios";
import Toaster from "@/components/Toaster";

const CommentForm = ({
  url,
  model,
  parent_id,
  modelName,
  user,
  handleClick,
  addComment,
}) => {
  const [comment, setComment] = useState("");
  const imageInput = useRef(null);
  const [cmntimage, setCmntimage] = useState(null);
  function convertImage() {
    var reader = new FileReader();
    var url = reader.readAsDataURL(imageInput.current.files[0]);
    reader.onloadend = function (e) {
      setCmntimage(reader.result);
    };
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (user) {
      const form = document.querySelector("form");
      const formData = new FormData(form);
      formData.append(`${modelName}_id`, model.id);
      formData.append("user_id", user.id);
      if (parent_id != null) {
        formData.append("parent_id", parent_id);
      }
      formData.append("body", comment);
      formData.append("image", cmntimage);
      formData.append("imgname", imageInput.current.value);

      axios
        .post(`${url}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success) {
            Toaster.notify(res.data.message, { type: "success" });
            setComment("");
            setCmntimage(null);
            addComment(res.data.comment);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      handleClick(true);
    }
  }
  return (
    <>
      <div className="my-4 mr-6">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700 ">
            <InputEmoji
              value={comment}
              onChange={setComment}
              cleanOnEnter
              borderRadius={0}
              placeholder="Type a comment..."
            />
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              htmlFor="imageInput"
              onClick={() => imageInput.current.click()}
            >
              <Image
                src="/icons8-picture.svg"
                alt="logo"
                width={24}
                height={24}
                className="rounded-t-lg py-6"
              />
              <span className="sr-only">Upload image</span>
            </button>
            <input
              ref={imageInput}
              type="file"
              name="imageInput"
              // multiple="true"
              onChange={convertImage}
              className="hidden"
            />
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <Image
                src="/icons8-plus.svg"
                alt="logo"
                width={26}
                height={26}
                className="rounded-t-lg py-4"
              />
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </form>
        {cmntimage != null ? (
          <div className="mx-2 my-2 flex items-center justify-between">
            <Image
              loader={() => cmntimage}
              src={cmntimage}
              alt={`${modelName}_${model.id}_${user.id}`}
              width={150}
              height={150}
              className="py-6 border border-red-400 rounded-lg m-1"
            />
            <div
              className="bg-white text-black md:p-4 sm:p-3 h-6 w-6 rounded-2xl flex justify-center items-center"
              onClick={() => {
                setCmntimage(null);
              }}
            >
              <span>x</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default CommentForm;
