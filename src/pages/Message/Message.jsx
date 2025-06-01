/* eslint-disable react/no-unescaped-entities */
import "./Message.css";
import chat from "../../../public/assets/chat.jpg";
import user from "../../../public/assets/avatar.jpg";
import {
  HiDotsVertical,
  HiOutlineEmojiSad,
  HiOutlineHome,
  HiOutlinePhone,
  HiOutlinePhotograph,
  HiOutlineSearch,
} from "react-icons/hi";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { IoMdLink } from "react-icons/io";
import { LuSendHorizonal } from "react-icons/lu";
import MessageList from "./MessageList";
const Message = () => {
  return (
    <div className="bg-[#EFF3F9] p-5 xl:px-20 lg:px-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-3xl font-semibold">Chat</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <HiOutlineHome className="text-[#0F79F3] size-5 mr-1" />
            <span>Dashboard</span>
          </div>
          <span>App</span>
          <span>Chat</span>
        </div>
      </div>
      <div className="messageWraps flex lg:flex-row flex-col justify-between gap-5 mt-5">
        <div className="messageLeftSide ">
          <h3 className="text-xl mb-2 font-semibold">Message</h3>
          <div className="searchChat">
            <HiOutlineSearch size={25} />{" "}
            <input type="text" placeholder="Search" />
          </div>

          <MessageList />
        </div>
        <div className="messageRightSide">
          <div className="flex flex-wrap gap-5 items-center justify-between p-8">
            <div className="flex items-center">
              <div className="relative">
                <img className="w-10 lg:w-20" src={chat} alt="chat" />
                <div className="activeUser absolute w-3 h-3 bg-green-500 rounded-full  md:bottom-6 bottom-0 left-5 md:left-16"></div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm md:text-xl font-semibold">Rahim Ullah</h3>
                <span className="text-[#0EC144]text-sm">Active Now</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <HiOutlineVideoCamera size={25} />
              <HiOutlinePhone size={25} />
              <HiDotsVertical size={25} />
            </div>
          </div>
          <hr className="border " />
          <div className="chatWraps">
            <div className="flex justify-end">
              <div>
                <div className="flex ">
                  <div>
                    <div className="userChat">
                      <span>
                        Nice! What features are you finding interesting?
                      </span>
                    </div>
                    <div className="userChat">
                      <span>
                        Hey Micheals, have you had a chance to check out the new
                        admin dashboard?
                      </span>
                    </div>
                  </div>
                  <img src={user} className="w-5 h-5 md:w-10 md:h-10 rounded-full" alt=""/>
                </div>
                <div className="flex justify-end mr-12 ">04.55</div>
              </div>
            </div>
            <div className="flex justify-start mt-5 ">
              <div>
                <div className="flex ">
                  <img src={user} className="w-5 h-5 md:w-10 md:h-10 rounded-full" alt="" />
                  <div>
                    <div className="adminChat">
                      <span>
                        Yeah, that's the one! It's got a sleek Material Design,
                        and the features are pretty robust.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex ml-10  ">04.50</div>
              </div>
            </div>
            <div className="flex justify-end">
              <div>
                <div className="flex ">
                  <div>
                    <div className="userChat">
                      <span>
                        Nice! What features are you finding interesting?
                      </span>
                    </div>
                  </div>
                  <img src={user} className="w-5 h-5 md:w-10 md:h-10 rounded-full" alt="" />
                </div>
                <div className="flex justify-end mr-12 ">04.55</div>
              </div>
            </div>
            <div className="flex justify-start mt-5 ">
              <div>
                <div className="flex ">
                  <img src={user} className="w-5 h-5 md:w-10 md:h-10 rounded-full" alt=""/>
                  <div>
                    <div className="adminChat ">
                      <span>
                        Yeah, that's the one! It's got a sleek Material Design,
                        and the features are pretty robust. and the features are
                        pretty robust. and the features are pretty robust.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex ml-10  ">04.50</div>
              </div>
            </div>
            <div className="flex justify-end">
              <div>
                <div className="flex mt-5">
                  <div>
                    <div className="userChat">
                      <span>
                        Hey Micheals, have you had a chance to check out the new
                        admin dashboard?
                      </span>
                    </div>
                  </div>
                  <img src={user} className="w-5 h-5 md:w-10 md:h-10 rounded-full" alt=""/>
                </div>
                <div className="flex justify-end mr-12 ">04.55</div>
              </div>
            </div>
          </div>
          <div className="chatting ">
            <div className="flex flex-wrap gap-3  items-center justify-between ">
              <div className="flex items-center space-x-2">
                <HiOutlineEmojiSad  className="md:size-8 " />
                <IoMdLink  className="md:size-8 " />
                <HiOutlinePhotograph  className="md:size-8" />
              </div>
             <div className="flex items-center">
             <input
                type="text"
                placeholder="Typing here......"
                className="chatInput"
              />
              <button className="chatBtn">
                {" "}
                <LuSendHorizonal className="md:size-8" />{" "}
              </button>
             </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5"></div>
    </div>
  );
};

export default Message;
