import Slidebar from "./components/Sildebar";
import TwitterForm from "./components/TwitterForm";
import Tweet from "./components/Tweet";
import { getAvatar, getRandomImage } from "./utils/generateImages";
import TrendItem from "./components/TrendItem";
import FollowItem from "./components/FollowItem";

import { v4 } from "uuid";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [Tweets, setTweets] = useState([]);
  const addNewTweet = (content, includeImage = false) => {
    const newTweet = {
      id: v4(),
      name: "User",
      username: `user${Math.floor(Math.random() * 1000)}`,
      avatar: getAvatar(`user${Math.floor(Math.random() * 1000)}@gmail.com`),
      content: content,
      time: new Date().toLocaleString([], {
        hour: `2-digit`,
        minute: `2-digit`,
      }),
      image: includeImage ? getRandomImage() : null,
      likes: 0,
      retweets: 0,
      comments: 0,
    };

    setTweets((prevTweets) => [newTweet, ...prevTweets]);
  };

  return (
    <div className="flex mx-auto max-w-7xl">
      <Slidebar />
      <main className="grow border-l border-r border-gray-700 max-w-xl">
        <header className="sticky top-0 z-10 bg-twitter-background bg-opacity-80 backdrop-blur-sm">
          <h2 className="px-4 py-3 text-xl font-bold">For You</h2>
        </header>
        <TwitterForm
          onTweet={(content) => addNewTweet(content, Math.random() > 0.6)}
        />
        <div>
          {Tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </main>
      <aside className="hidden xl:block w-80 px-4">
        <div className="sticky top-0 pt-2">
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute top-3 left-3 text-gray-500 cursor-pointer"
            />
            <input
              placeholder="Search Twitter"
              className="w-full bg-gray-800 text-white rounded-full outline-none py-2 pl-10 pr-4"
            />
          </div>
          <div className="bg-gray-800 rounded-xl mt-4 p-4">
            <h2 className="font-bold text-xl mb-4">Subscribe to Preminm</h2>
            <p className="text-gray-500 mb-4">
              Subscribe to unlock new features and if eligible, receive a share
              of ads revenue.
            </p>
            <button className="bg-twitter-blue text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200 cursor-pointer">
              Subscribe
            </button>
          </div>
          <div className="bg-gray-800 rounded-xl mt-4 p-4">
            <h2 className="font-bold text-xl mb-4">Whats happening</h2>
            <TrendItem category="NFL . LIVE" name="Cardinals at Bills" />
            <TrendItem category="Sports . Trending" name="Kyle Dugger" />
            <TrendItem
              category="Sports . Trending"
              name="Anthony Richardson"
              tweetCount="45,336"
            />
            <TrendItem
              category="Sports . Trending"
              name="Bryce Young"
              tweetCount="5,356"
            />
            <TrendItem
              category="Sports . Trending"
              name="Daboll"
              tweetCount="1,342"
            />
          </div>
          <div className="bg-gray-800 rounded-xl mt-4 p-4">
            <h2 className="font-bold text-xl mb-4">Who to follow</h2>
            <FollowItem name="Bill Gates" username="BillGates" />
            <FollowItem name="Will Smith" username="Will S." />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default App;
