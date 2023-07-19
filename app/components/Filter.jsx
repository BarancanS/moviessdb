"use client";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "../components/Context";

const Filter = () => {
  const { posts, setPosts } = useContext(MainContext);
  const [filteredPosts, SetFilteredPosts] = useState([]);

  function FilterNetflixButtonClick() {
    SetFilteredPosts(
      posts.filter((items) => items.platform.includes("Netflix"))
    );
  }
  function FilterAmazonButtonClick() {
    SetFilteredPosts(
      posts.filter((items) => items.platform.includes("Amazon"))
    );
  }
  function ClearFilterButtonClick() {
    SetFilteredPosts(posts);
  }
  return (
    <div>
      <button onClick={FilterNetflixButtonClick}>Netflix</button>
      <button onClick={FilterAmazonButtonClick}>Amazon</button>
      <button onClick={ClearFilterButtonClick}>Clear</button>
      <div>
        <ul>
          <li>
            {filteredPosts.map((items, index) => {
              return (
                <div key={index}>
                  <p>{items.title}</p>
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
