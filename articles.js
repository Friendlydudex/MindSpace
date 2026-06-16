// All your blog articles live here
// Easy way to make new articles is to just copy the old one and changing the initial elements like id ect...
// Userbased articles will be added soon I have to figure out a way to do it
// Each article needs: id, title, author, date, category, summary, and content

const articles = [
  {
    id: 1,
    title: "Why Philosophy Still Matters",
    author: "Sara Ahmadi",
    date: "2025-03-12",
    category: "Philosophy",
    summary: "In a world obsessed with practicality, philosophy gives us the tools to question everything — including the systems we live inside.",
    content: `
      Philosophy is not a luxury. It is the practice of asking whether the world we inherited is the world we want to keep.
      
      Most people go through life accepting the rules of the game without ever asking who wrote them, or why, or whether they serve anyone beyond the people already winning.
      
      That is not ignorance — it is survival. When your energy goes toward getting through the day, there is little left for questioning the shape of the day itself.
      
      But when someone does stop and ask — really ask — something shifts. Not immediately. Not loudly. But the question, once asked, does not go away.
      
      Philosophy is that question. It does not promise answers. It promises honesty about how hard the answers are.
      
      And in a world that profits from your certainty, that honesty is a form of resistance.
    `,
    language: "en"
  },
  {
    id: 2,
    title: "What Games Teach Us About Meaning",
    author: "Dara Moradi",
    date: "2025-04-01",
    category: "Culture",
    summary: "Games are not an escape from real life. They are one of the few places where failure has no permanent cost and meaning is immediate.",
    content: `
      There is a reason people play games when the world gets heavy.
      
      It is not avoidance. It is relief — the specific relief of being inside a system where the rules are clear, where your actions have visible consequences, and where failure simply means you try again.
      
      Real life rarely offers that. Failure in real life is expensive. Consequences are slow and unclear. You can do everything right and still lose.
      
      Games compress that chaos into something manageable. They say: here is a problem, here are your tools, here is what success looks like.
      
      That is not childish. That is one of the most human things there is — the desire for a world where effort and outcome are connected.
      
      The best games go further. They make you feel something real. They put you inside characters who are broken or lost or carrying too much, and they ask you to keep going anyway.
      
      That is not escape. That is practice.
    `,
    language: "en"
  },
  {
    id: 3,
    title: "Empathy Is Not A Weakness",
    author: "Nima Karimi",
    date: "2025-05-10",
    category: "Society",
    summary: "In our never ending war for self perfection we began to see our feelings towards others as somekind of weakness",
    content: `
    In our modern society we value the sense of self above all else, we can see it getting stronger and stronger by every instanse of hardship that could incounter.

    people ask themselves this question "why should I care about how others feel and are when my everyday life is getting harder?" and it's honest and right question.

    the problem with that question is that we are blaming the wrong element of our lives and trying to delete that from existance, instead of we trying to actually right our wrongs by trying to change or outright break the system that is causing these hardships.

    the sad truth is that with the amount of people giving up on empathy for our brothers and sisters we have sent this heavy weight to someone else to carry and it's a backbreaking weight and in time it will break them cause we chose to care for ourselves instead of others.

    there will be a time where people are just so numb to the sight of pain that we are ready to walk past it with no emotion at all and that is the true endpoint of this path that we are going towards.
    `,
    language: "en"
  }
];
