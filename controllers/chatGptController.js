const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

class ChatGptController {
  prompt = async (req, res) => {
    const { content } = { ...req.body };
    try {
      const data = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Generate a catchy description for this property listing based on the following user inputs in key-value pairs. These user inputs include title: ${content.title},fullAddress: ${content.fullAddress}, price: ${content.price}, postalCode: ${content.postalCode}, pubIncluded: ${content.pubIncluded}, paxCount: ${content.paxCount},airCon: ${content.airCon}, internet: ${content.internet},furnishedCondition: ${content.furnishedCondition}, level: ${content.level}, advertisedBy: ${content.advertisedBy}, leaseMonth: ${content.leaseMonth},gender: ${content.gender},cookingAllowed: ${content.cookingAllowed},bedroomCount: ${content.bedroomCount}, washroomAttached: ${content.washroomAttached}, lift: ${content.lift},washroomCount: ${content.washroomCount}, visitorAllowed: ${content.visitorAllowed},petAllowed: ${content.petAllowed},
 userLocationOption:  ${content.userLocationOption},
 userPropertyTypeOption:  ${content.userPropertyTypeOption},
  userRoomTypeOption:  ${content.userRoomTypeOption},
  availability:  ${content.availability},`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      return res.json(data.choices[0].message.content.replace(/"/g, ""));
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = ChatGptController;
