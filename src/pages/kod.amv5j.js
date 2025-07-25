import { askOpenAI } from 'backend/askOpenAI.jsw';

$w.onReady(function () {
  $w("#sendButton").onClick(async () => {
    const userInput = $w("#userInput").value;

    const messages = [
      { role: "system", content: "אתה עוזר מכירות שמומחה בקוד המפצח." },
      { role: "user", content: userInput }
    ];

    try {
      const reply = await askOpenAI(messages);
      $w("#chatLog").text += "\nBot: " + reply;
    } catch (error) {
      console.log("❌ Error:", error);
      $w("#chatLog").text += "\n❌ שגיאה בתקשורת עם השרת או OpenAI.";
    }
  });
});
