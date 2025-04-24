"use client";
import { useState } from "react";
import explanations from '../utils/explanations';

export default function Home() {
  const [formData, setFormData] = useState({
    productOverview: "",
    coreValueProposition: "",
    targetAudienceType: "",
    targetAudienceDetails: "",
    currentStage: "Just an idea",
    goal: "Awareness",
    budget: 100,
    strengths: "",
    constraints: "",
    preferredChannels: {
      paidAds: false,
      partnerships: false,
      contentMarketing: false,
      communityBuilding: false,
      pr: false,
      sem: false,
      seo: false,
      viral: false,
      otherChannel: false
    },
    preferredChannelsOther: "",
    tone: "",
    email: "",
  });
  const [budgetValue, setBudgetValue] = useState(formData.budget);
  const [miniPlan, setMiniPlan] = useState(null);

  const handleTaskDone = (channelIndex, taskIndex) => {
    const updatedChannels = miniPlan.channels.map((channel, index) => {
      if (index === channelIndex) {
        return {
          ...channel,
          tasks: channel.tasks.map((task, taskIdx) =>
            taskIdx === taskIndex ? { ...task, done: !task.done } : task
          ),
        };
      }
      return channel;
    });
    setMiniPlan({ ...miniPlan, channels: updatedChannels });
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    if (id === "budget") setBudgetValue(value);
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setFormData({
      ...formData,
      preferredChannels: {
        ...formData.preferredChannels,
        [id]: checked,
      },
    });
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value, targetAudienceDetails: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          console.log('Error sending data');
          console.log(response);
          return;
        }
        response.json().then(parsedResponse => {
            setMiniPlan(parsedResponse);
            console.log(parsedResponse);
        });
    })
      .catch((error) => console.log('Error sending data'));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <header className="text-4xl font-bold mb-12">
        LaunchPilot MVP: BLASTari Market Plan Prompt Builder
      </header>
      
      {miniPlan && (
        <div className="w-full max-w-4xl space-y-8">
            <h2 className="text-2xl font-bold">Mini plan</h2>
            {miniPlan.channels && miniPlan.channels.length > 0 ? (
                <ul>
                    {miniPlan.channels.map((channel, index) => (
                        <li key={index}>
                            <p>Channel: {channel.name}</p>
                            <ul>{channel.tasks.map((task, taskIndex) => (
                                <li key={taskIndex}>
                                    <input
                                        type="checkbox"
                                        id={`channel-${index}-task-${taskIndex}`}
                                        defaultChecked={task.done}
                                        onChange={() => handleTaskDone(index, taskIndex)}
                                    />
                                    <label htmlFor={`channel-${index}-task-${taskIndex}`}>{task.description}</label>
                                </li>
                            ))}</ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No channels were selected</p>
            )}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-8">
        {/* Product Overview and Core Value Proposition */}
        {Object.keys(explanations).map(key => (
          <div key={key}>
            {key !== "targetAudience" && key !== "targetAudienceDetails" && 
             key !== "preferredChannelsOther" && key !== "currentStage" && 
             key !== "goal" && key !== "budget" && key !== "preferredChannels" && (
              <>
                <label
                  htmlFor={key}
                  className="block font-bold text-gray-700"           
                >
                  {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </label>
                <p className="text-sm text-gray-500 mb-4">{explanations[key]}</p>
                <textarea
                  id={key}
                  className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData[key]}
                  onChange={handleInputChange}
                />
              </>
            )}
            
            {/* Target Audience */}
            {key === "targetAudience" && (
              <>
                <div>
                  <label 
                    htmlFor={key}
                    className="block font-bold text-gray-700"
                  >
                    Target Audience
                  </label>
                  <p className="text-sm text-gray-500 mb-4">
                    {explanations[key]}
                  </p>
                </div>
                <div className="flex space-x-4 mb-2">
                  <div>
                    <input
                      type="radio"
                      id="consumers"
                      name="targetAudienceType"
                      value="consumers"
                      checked={formData.targetAudienceType === "consumers"}
                      onChange={handleRadioChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="consumers" className="ml-3">
                      Consumers
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="business"
                      name="targetAudienceType"
                      value="business"
                      checked={formData.targetAudienceType === "business"}
                      onChange={handleRadioChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="business" className="ml-3">
                      Business
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="government"
                      name="targetAudienceType"
                      value="government"
                      checked={formData.targetAudienceType === "government"}
                      onChange={handleRadioChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="government" className="ml-3">
                      Government
                    </label>
                  </div>
                </div>          
                {formData.targetAudienceType && (
                  <textarea
                    id="targetAudienceDetails"
                    placeholder={
                      formData.targetAudienceType === "consumers" 
                        ? "e.g., Gen Z, Gen Alpha, Millennials, Parents, Techies, Students, etc."
                        : formData.targetAudienceType === "business" 
                          ? "e.g., Industry" 
                          : "e.g., Sector"
                    }
                    className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                    value={formData.targetAudienceDetails}
                    onChange={handleInputChange}
                  />
                )}
              </>
            )}
            
            {key === "preferredChannelsOther" && formData.preferredChannels.otherChannel && (
              <>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700 mt-2">
                  Specify Other Channels
                </label>
                <textarea 
                  id={key} 
                  value={formData[key]}
                  onChange={handleInputChange}
                  placeholder="Please specify other marketing channels you're interested in..."
                  className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}
          </div>
        ))}
        
        {/* Current Stage */}
        <div>
          <label htmlFor="currentStage" className="block font-bold text-gray-700">
            Current Stage
          </label>
          <p className="text-sm text-gray-500 mb-4">{explanations.currentStage}</p>
          <select
            id="currentStage"
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.currentStage}
            onChange={handleInputChange}
          >
            <option>Just an idea</option>
            <option>MVP live</option>
            <option>Some beta users</option>
            <option>Public launch</option>
            <option>Revenue generating</option>
          </select>
        </div>
        
        {/* Goal */}
        <div>
          <label htmlFor="goal" className="block font-bold text-gray-700">
            Goal
          </label>
          <p className="text-sm text-gray-500 mb-4">{explanations.goal}</p>
          <select
            id="goal"
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.goal}
            onChange={handleInputChange}
          >
            <option>Awareness</option>
            <option>Waitlist signups</option>
            <option>App downloads</option>
            <option>Purchases/Users</option>
            <option>Feedback/Validation</option>
            <option>Brand credibility</option>
          </select>
        </div>
        
        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block font-bold text-gray-700">
            Budget
          </label>
          <p className="text-sm text-gray-500 mb-4">{explanations.budget}</p>
          <input 
            type="range" 
            id="budget" 
            value={formData.budget} 
            onChange={handleInputChange} 
            min="100" 
            max="10000" 
            className="w-full" 
          />
          <p className="text-sm text-gray-700 mt-2">${budgetValue}</p>
        </div>
        
        {/* Preferred Channel Types */}
        <div>
          <label htmlFor="preferredChannels" className="block font-bold text-gray-700">
            Preferred Channel Types (Optional)
          </label>
          <p className="text-sm text-gray-500 mb-4">{explanations.preferredChannels}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <input 
                type="checkbox" 
                id="paidAds" 
                checked={formData.preferredChannels.paidAds}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="paidAds" className="ml-3">
                Paid ads
              </label>
            </div>
            <div>
              <input 
                type="checkbox" 
                id="partnerships" 
                checked={formData.preferredChannels.partnerships}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="partnerships" className="ml-3">
                Partnerships/affiliates
              </label>
            </div>
            <div>
              <input 
                type="checkbox" 
                id="contentMarketing" 
                checked={formData.preferredChannels.contentMarketing}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="contentMarketing" className="ml-3">
                Content marketing
              </label>
            </div>
            <div>
              <input 
                type="checkbox" 
                id="communityBuilding"
                checked={formData.preferredChannels.communityBuilding}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
              />
              <label htmlFor="communityBuilding" className="ml-3">
                Community building
              </label>
            </div>
            <div>
              <input 
                type="checkbox" 
                id="pr" 
                checked={formData.preferredChannels.pr}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
              />
              <label htmlFor="pr" className="ml-3">
                PR
              </label>
            </div>
            <div>
              <input 
                type="checkbox" 
                id="sem" 
                checked={formData.preferredChannels.sem}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
              />
              <label htmlFor="sem" className="ml-3">
                SEM
              </label>
            </div>
            <div>
              <input 
                type="checkbox" 
                id="seo" 
                checked={formData.preferredChannels.seo}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
              />
              <label htmlFor="seo" className="ml-3">
                SEO
              </label>
            </div>
            <div>
              <input 
                type="checkbox" 
                id="viral" 
                checked={formData.preferredChannels.viral}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
              />
              <label htmlFor="viral" className="ml-3">
                Viral/referral mechanics
              </label>
            </div>
            <div>
              <input 
                type="checkbox" 
                id="otherChannel" 
                checked={formData.preferredChannels.otherChannel}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
              />
              <label htmlFor="otherChannel" className="ml-3">Other</label>
            </div>
          </div>
        </div>
        
        {/* Email and Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}