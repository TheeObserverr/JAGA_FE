"use client";
import PageHeader from "../../components/PageHeader";
import Modal from "../../components/Modal";
import { useState } from "react";

export default function LeaderboardPage() {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  

  const [selectedFriend, setSelectedFriend] = useState<any>(null);

  const [friends, setFriends] = useState([
      { 
          id: 1, name: "Tan Ah Hock (You)", rank: 2, points: 1250, img: "👴",
          breakdown: [
              { label: "Healthy Meals", points: 600, icon: "🥗" },
              { label: "Daily Walks", points: 400, icon: "🚶" },
              { label: "Medication Adherence", points: 250, icon: "💊" }
          ]
      },
      { 
          id: 2, name: "Lim Boon Heng", rank: 1, points: 1400, img: "🤠",
          breakdown: [
              { label: "Healthy Meals", points: 700, icon: "🥗" },
              { label: "Daily Walks", points: 500, icon: "🚶" },
              { label: "Community Events", points: 200, icon: "🎉" }
          ]
      },
      { 
          id: 3, name: "Auntie Mary", rank: 3, points: 980, img: "👵",
           breakdown: [
              { label: "Healthy Meals", points: 400, icon: "🥗" },
              { label: "Daily Walks", points: 300, icon: "🚶" },
              { label: "Tai Chi", points: 280, icon: "🧘" }
          ]
      },
      { 
          id: 4, name: "Uncle John", rank: 4, points: 850, img: "👲",
           breakdown: [
              { label: "Healthy Meals", points: 300, icon: "🥗" },
              { label: "Daily Walks", points: 400, icon: "🚶" },
              { label: "Gardening", points: 150, icon: "🌻" }
          ]
      },
  ]);

  const potentialFriends = [
      { id: 5, name: "Mdm. Lee", age: 72, img: "👵" },
      { id: 6, name: "Mr. Muthu", age: 68, img: "👴" },
  ];

  const handleAddFriend = (friend: any) => {
      setFriends([...friends, { ...friend, rank: 5, points: 0, breakdown: [] }]);
      setIsAddFriendOpen(false);
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader title="Kampung Leaderboard" />

        {/* Hero Card - Clickable for own breakdown */}
        <div 
            onClick={() => setSelectedFriend(friends[0])}
            className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white text-center shadow-lg mb-8 relative overflow-hidden cursor-pointer active:scale-95 transition"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            <p className="text-yellow-100 font-bold uppercase tracking-widest text-sm mb-1">Your Rank</p>
            <h2 className="text-5xl font-black mb-2 drop-shadow-md">#2</h2>
            <p className="text-lg font-bold">1,250 Health Points</p>
            <div className="mt-4 inline-block bg-white/20 px-4 py-1 rounded-full text-sm backdrop-blur-sm">
                Tap to see breakdown 🔍
            </div>
        </div>

        {/* Leaderboard List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-800">Friendly Competition</h3>
                <button 
                    onClick={() => setIsAddFriendOpen(true)}
                    className="text-primary text-sm font-bold hover:underline"
                >
                    + Add Friend
                </button>
            </div>
            
            <div className="divide-y divide-gray-50">
                {friends.sort((a,b) => b.points - a.points).map((friend, index) => (
                    <div 
                        key={friend.id} 
                        onClick={() => setSelectedFriend(friend)}
                        className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition ${friend.name.includes('(You)') ? 'bg-yellow-50 hover:bg-yellow-100' : ''}`}
                    >
                         <div className={`w-8 h-8 flex items-center justify-center font-black text-lg ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-orange-400' : 'text-gray-300'}`}>
                            {index + 1}
                         </div>
                         <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-sm">
                            {friend.img}
                         </div>
                         <div className="flex-1">
                            <p className={`font-bold ${friend.name.includes('(You)') ? 'text-primary' : 'text-gray-900'}`}>
                                {friend.name}
                            </p>
                            <p className="text-xs text-gray-500">Tap to view score</p>
                         </div>
                         <div className="text-right">
                            <p className="font-bold text-gray-900">{friend.points}</p>
                            <p className="text-[10px] text-gray-400 uppercase">Pts</p>
                         </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Challenge Invite */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white text-center shadow-lg">
            <h3 className="text-xl font-bold mb-2">Morning Walk Challenge</h3>
            <p className="text-blue-100 text-sm mb-4">Invite 3 friends for a walk at East Coast Park this Saturday!</p>
            <button 
                onClick={() => setIsChallengeOpen(true)}
                className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-blue-50 transition"
            >
                Start Challenge
            </button>
        </div>

        {/* Modals */}
        <Modal
            isOpen={isAddFriendOpen}
            onClose={() => setIsAddFriendOpen(false)}
            title="Add a Friend"
        >
            <div className="space-y-4">
                <p className="text-gray-600 text-sm">Find friends from your neighbourhood to compete with!</p>
                {potentialFriends.map(pf => (
                    <div key={pf.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{pf.img}</span>
                            <div>
                                <p className="font-bold text-gray-900">{pf.name}</p>
                                <p className="text-xs text-gray-500">{pf.age} years old</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleAddFriend(pf)}
                            className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-primary/90"
                        >
                            Add
                        </button>
                    </div>
                ))}
            </div>
        </Modal>

        <Modal
            isOpen={isChallengeOpen}
            onClose={() => setIsChallengeOpen(false)}
            title="Challenge Started!"
        >
            <div className="text-center py-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🚀</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Invitations Sent!</h3>
                <p className="text-gray-600 text-sm">Your friends will receive a notification to join the Morning Walk Challenge.</p>
                <button onClick={() => setIsChallengeOpen(false)} className="mt-6 w-full bg-blue-600 text-white font-bold py-3 rounded-xl">Awesome!</button>
            </div>
        </Modal>


        <Modal
            isOpen={!!selectedFriend}
            onClose={() => setSelectedFriend(null)}
            title="Score Composition"
        >
            {selectedFriend && (
                <div>
                     <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl shrink-0">
                            {selectedFriend.img}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{selectedFriend.name}</h3>
                            <p className="text-gray-500">{selectedFriend.points} Total Points</p>
                        </div>
                    </div>
                    
                    <h4 className="font-bold text-gray-800 mb-3">Points Breakdown</h4>
                    <div className="space-y-3">
                        {selectedFriend.breakdown && selectedFriend.breakdown.length > 0 ? (
                            selectedFriend.breakdown.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="font-medium text-gray-700">{item.label}</span>
                                    </div>
                                    <span className="font-bold text-primary">+{item.points}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-center py-4">No points data available yet.</p>
                        )}
                    </div>

                    <button 
                        onClick={() => setSelectedFriend(null)}
                        className="w-full mt-6 bg-gray-200 text-gray-800 font-bold py-3 rounded-xl hover:bg-gray-300 transition"
                    >
                        Close
                    </button>
                </div>
            )}
        </Modal>
      </div>
    </div>
  );
}
