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
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FrinedList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend "}
        </Button>
      </div>
      <FormSplitBills />
    </div>
  );
}

function FrinedList({ friends }) {
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

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !img) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      img: `${img}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);

    setName("");
    setImg("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🙎‍♂️Frined Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄Image url</label>
      <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
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
