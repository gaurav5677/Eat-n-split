import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
//Reusable Component
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FrinedList />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend "}
        </Button>
      </div>
      <FormSplitBills />
    </div>
  );
}

function FrinedList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {/* here i use && operator for conditional rendering cause this cases are mutually exclusive , its easier to have three time &&  */}
      {friend.balance < 0 && (
        <p className="red">
          You own {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even </p>}

      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🙎‍♂️Frined Name</label>
      <input type="text" />

      <label>🌄Image url</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBills() {
  return (
    <form className="form-split-bill">
      <h2> Split a bill with Friend</h2>

      <label> 💰 Bill Value</label>
      <input type="text" />
      <label> 🕴️Your Expences</label>
      <input type="text" />
      <label>🧑‍🤝‍🧑 X's Expences </label>
      <input type="text" />

      <label> 💳 Who is paying the Bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X's</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
