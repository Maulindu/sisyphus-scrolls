
export const getPhilosopherBySlug = (slug) => {
  return timelineData.find(philosopher => philosopher.slug === slug);
};

export const getAllPhilosopherSlugs = () => {
  return timelineData.map(philosopher => philosopher.slug);
};


export const timelineData = [
  {
    year: "6th Century BCE",
    title: "Thales of Miletus",
    slug: "thales-of-miletus",
    description: "Mathematics, physics, astronomy",
    containerImage: "/Thales1.jpg",
    fullBio: `Thales of Miletus (c. 624 – c. 546 BCE) was a Greek mathematician, astronomer, statesman, and pre-Socratic philosopher from Miletus in Ionia, Asia Minor. He is remembered primarily for his cosmology based on water as the essence of all matter, with Earth a flat disk floating on a vast sea. Thales is recognized as the first individual in Western civilization known to have entertained and engaged in scientific philosophy, making him the first true mathematician and the father of science.`,
    keyIdeas: [
      "Water is the fundamental principle (arche) of all things",
      "The Earth floats on water",
      "Everything is full of gods - all things possess a divine element",
      "Mathematical reasoning and geometric proofs",
      "Natural explanations for natural phenomena, rejecting mythological explanations"
    ],
    quotes: [
      "The most difficult thing in life is to know yourself.",
      "Nothing is more active than thought, for it travels over the universe.",
      "Hope is the only good that is common to all men; those who have nothing else possess hope still."
    ],
    majorWorks: [
      "Prediction of solar eclipse (585 BCE)",
      "Thales' theorem in geometry",
      "Astronomical observations and calendars",
      "Contributions to navigation and engineering"
    ]
  },
  {
    year: "4th Century BCE",
    title: "Socrates",
    slug: "socrates",
    description: "Dialectic method, ethics, pursuit of virtue.",
    containerImage: "/Socrates1.jpg",
    fullBio: `Socrates (470–399 BCE) was a classical Greek philosopher credited as the founder of Western philosophy and among the first moral philosophers of the ethical tradition of thought. An enigmatic figure, Socrates authored no texts and is known mainly through the accounts of classical writers, especially his students Plato and Xenophon. Through his portrayal in Plato's dialogues, Socrates has become renowned for the Socratic method of questioning, which seeks to get to the foundations of our beliefs and ideas. He was ultimately sentenced to death by drinking hemlock for allegedly corrupting the youth of Athens and impiety.`,
    keyIdeas: [
      "The Socratic method - learning through questioning and dialogue",
      "An unexamined life is not worth living",
      "Virtue is knowledge; if people knew what was right, they would do it",
      "No one does wrong willingly - evil is the result of ignorance",
      "Emphasis on ethical conduct and self-knowledge"
    ],
    quotes: [
      "I know that I know nothing.",
      "The unexamined life is not worth living.",
      "Wisdom begins in wonder.",
      "To find yourself, think for yourself.",
      "Be kind, for everyone you meet is fighting a hard battle."
    ],
    majorWorks: [
      "No written works - teachings preserved through Plato's dialogues",
      "The Socratic Method of inquiry",
      "Influenced: Apology, Crito, Phaedo (written by Plato)"
    ]
  },
  {
    year: "400 BCE",
    title: "Plato",
    slug: "plato",
    description: "Justice, beauty, equality. Founded the Academy.",
    containerImage: "/Plato1.jpg",
    fullBio: `Plato (428/427 BCE – 348/347 BCE) was an ancient Greek philosopher born in Athens during the Classical period. A student of Socrates and teacher of Aristotle, he founded the Platonist school of thought and the Academy, the first institution of higher learning in the Western world. His philosophical dialogues have been used to teach a range of subjects, including philosophy, logic, ethics, rhetoric, religion and mathematics. Plato's influence on Western culture was so profound that Alfred North Whitehead once noted: "The safest general characterization of the European philosophical tradition is that it consists of a series of footnotes to Plato."`,
    keyIdeas: [
      "Theory of Forms - the world of perfect, eternal, unchangeable ideas",
      "The allegory of the cave - most people live in illusion",
      "Philosopher kings should rule - the wise should govern",
      "Tripartite soul: reason, spirit, and appetite",
      "Knowledge is recollection - learning is remembering what the soul already knows"
    ],
    quotes: [
      "The beginning is the most important part of the work.",
      "Wise men speak because they have something to say; fools because they have to say something.",
      "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.",
      "One of the penalties for refusing to participate in politics is that you end up being governed by your inferiors."
    ],
    majorWorks: [
      "The Republic",
      "The Symposium",
      "Phaedo",
      "Apology",
      "Phaedrus",
      "Timaeus"
    ]
  },
  {
    year: "300 BCE",
    title: "Aristotle",
    slug: "aristotle",
    description: "Formal logic, ethics, metaphysics.",
    containerImage: "/Aristotle1.jpg",
    fullBio: `Aristotle (384–322 BCE) was a Greek philosopher and polymath during the Classical period in Ancient Greece. Taught by Plato, he was the founder of the Peripatetic school of philosophy within the Lyceum and the wider Aristotelian tradition. His writings cover many subjects including physics, biology, zoology, metaphysics, logic, ethics, aesthetics, poetry, theatre, music, rhetoric, psychology, linguistics, economics, politics, and government. Aristotle's views profoundly shaped medieval scholarship and influenced Judeo-Islamic philosophies during the Middle Ages, as well as Christian theology and thought.`,
    keyIdeas: [
      "Logic and syllogistic reasoning - the foundation of logical thinking",
      "Virtue ethics and the golden mean - virtue lies between extremes",
      "Four causes: material, formal, efficient, and final",
      "Teleology - everything has a purpose or end goal",
      "Empiricism - knowledge comes from sensory experience"
    ],
    quotes: [
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      "The whole is greater than the sum of its parts.",
      "It is the mark of an educated mind to be able to entertain a thought without accepting it.",
      "Knowing yourself is the beginning of all wisdom."
    ],
    majorWorks: [
      "Nicomachean Ethics",
      "Politics",
      "Metaphysics",
      "Poetics",
      "Prior Analytics",
      "Physics"
    ]
  },
  {
    year: "1st Century CE",
    title: "Seneca",
    slug: "seneca",
    description: "Stoicism, virtue, resilience in adversity.",
    containerImage: "/Seneca1.jpg",
    fullBio: `Lucius Annaeus Seneca (c. 4 BCE – 65 CE), known as Seneca the Younger, was a Roman Stoic philosopher, statesman, and dramatist. As a tutor and later advisor to emperor Nero, Seneca was one of Rome's leading intellectual figures in the mid-1st century CE. He is best known for his philosophical works expounding Stoic philosophy, which emphasized rationality, self-control, and fortitude as means to overcome destructive emotions. His writings on virtue, the shortness of life, and the importance of living according to nature have influenced thinkers for centuries.`,
    keyIdeas: [
      "Live according to nature and reason",
      "Focus on what you can control, accept what you cannot",
      "Time is our most valuable possession",
      "Prepare for misfortune through negative visualization",
      "Virtue is the only true good"
    ],
    quotes: [
      "We suffer more often in imagination than in reality.",
      "Luck is what happens when preparation meets opportunity.",
      "It is not that we have a short time to live, but that we waste a lot of it.",
      "Difficulties strengthen the mind, as labor does the body."
    ],
    majorWorks: [
      "Letters to Lucilius (Epistulae Morales ad Lucilium)",
      "On the Shortness of Life",
      "On Anger",
      "On Providence",
      "Natural Questions"
    ]
  },
  {
    year: "13th Century",
    title: "Thomas Aquinas",
    slug: "thomas-aquinas",
    description: "Natural law, theology, synthesis of faith and reason.",
    containerImage: "",
    fullBio: `Thomas Aquinas (1225–1274) was an Italian Dominican friar, philosopher, and theologian who became one of the most influential thinkers in the Western tradition. He synthesized Aristotelian philosophy with Christian theology, creating a comprehensive philosophical and theological system that became the official doctrine of the Catholic Church. His work attempts to reconcile faith and reason, arguing that both are paths to truth. Aquinas believed that reason could demonstrate certain truths about God and the natural world, while other truths required divine revelation.`,
    keyIdeas: [
      "Faith and reason are complementary, not contradictory",
      "Five Ways - five logical arguments for the existence of God",
      "Natural law theory - moral law is derived from nature and reason",
      "The concept of just war",
      "All knowledge begins with sensory experience"
    ],
    quotes: [
      "To one who has faith, no explanation is necessary. To one without faith, no explanation is possible.",
      "Three things are necessary for the salvation of man: to know what he ought to believe; to know what he ought to desire; and to know what he ought to do.",
      "There is nothing in the intellect that was not first in the senses."
    ],
    majorWorks: [
      "Summa Theologica",
      "Summa contra Gentiles",
      "Disputed Questions on Truth",
      "Commentary on Aristotle's works"
    ]
  },
  {
    year: "17th Century",
    title: "René Descartes",
    slug: "rene-descartes",
    description: "Cogito ergo sum, rationalism, dualism.",
    containerImage: "",
    fullBio: `René Descartes (1596–1650) was a French philosopher, mathematician, and scientist who is considered the father of modern philosophy. His famous statement "Cogito, ergo sum" ("I think, therefore I am") became a fundamental element of Western philosophy, as it formed the basis for knowledge in the face of radical doubt. Descartes sought to establish a secure foundation for scientific knowledge by doubting everything that could possibly be doubted. His method of systematic doubt and his mind-body dualism profoundly influenced subsequent philosophy.`,
    keyIdeas: [
      "Cogito ergo sum - I think, therefore I am",
      "Mind-body dualism - the mind and body are distinct substances",
      "Method of systematic doubt to find certain knowledge",
      "Clear and distinct ideas are true",
      "Rationalism - reason is the primary source of knowledge"
    ],
    quotes: [
      "I think, therefore I am.",
      "The reading of all good books is like a conversation with the finest minds of past centuries.",
      "Divide each difficulty into as many parts as is feasible and necessary to resolve it.",
      "It is not enough to have a good mind; the main thing is to use it well."
    ],
    majorWorks: [
      "Meditations on First Philosophy",
      "Discourse on the Method",
      "Principles of Philosophy",
      "The Passions of the Soul"
    ]
  },
  {
    year: "18th Century",
    title: "David Hume",
    slug: "david-hume",
    description: "Empiricism, skepticism, philosophy of mind.",
    containerImage: "",
    fullBio: `David Hume (1711–1776) was a Scottish Enlightenment philosopher, historian, economist, and essayist who is best known for his influential system of philosophical empiricism, skepticism, and naturalism. Hume argued that all human knowledge is derived from sensory experience, and he was skeptical of claims to knowledge that went beyond what could be observed. His analysis of causation, personal identity, and morality challenged traditional philosophical assumptions and had a profound impact on later philosophy, particularly on Immanuel Kant.`,
    keyIdeas: [
      "All knowledge derives from sensory experience (empiricism)",
      "The problem of induction - we cannot prove causation through observation alone",
      "Personal identity is a bundle of perceptions, not a unified self",
      "Morality is based on sentiment, not reason",
      "Is-ought problem - you cannot derive ought from is"
    ],
    quotes: [
      "Beauty in things exists merely in the mind which contemplates them.",
      "A wise man proportions his belief to the evidence.",
      "Reason is, and ought only to be the slave of the passions.",
      "Generally speaking, the errors in religion are dangerous; those in philosophy only ridiculous."
    ],
    majorWorks: [
      "A Treatise of Human Nature",
      "An Enquiry Concerning Human Understanding",
      "An Enquiry Concerning the Principles of Morals",
      "Dialogues Concerning Natural Religion"
    ]
  },
  {
    year: "18th Century",
    title: "Immanuel Kant",
    slug: "immanuel-kant",
    description: "Ethics, epistemology, metaphysics.",
    containerImage: "",
    fullBio: `Immanuel Kant (1724–1804) was a German philosopher who is considered the central figure of modern philosophy. Kant argued that human concepts and categories structure our view of the world and its laws, and that reason is the source of morality. His comprehensive and systematic works in epistemology, metaphysics, ethics, and aesthetics have made him one of the most influential figures in Western philosophy. Kant's "Copernican Revolution" in philosophy suggested that objects must conform to our knowledge rather than knowledge conforming to objects.`,
    keyIdeas: [
      "Categorical imperative - act only according to principles you'd want as universal laws",
      "Synthetic a priori knowledge - knowledge that is both informative and certain",
      "Phenomena vs. noumena - things as we experience them vs. things in themselves",
      "Duty-based ethics - actions have moral worth only when done from duty",
      "Perpetual peace through democratic governance and international cooperation"
    ],
    quotes: [
      "Act only according to that maxim whereby you can at the same time will that it should become a universal law.",
      "Two things fill the mind with ever-increasing wonder and awe: the starry heavens above me and the moral law within me.",
      "Science is organized knowledge. Wisdom is organized life.",
      "Have patience awhile; slanders are not long-lived. Truth is the child of time; erelong she shall appear to vindicate thee."
    ],
    majorWorks: [
      "Critique of Pure Reason",
      "Critique of Practical Reason",
      "Critique of Judgment",
      "Groundwork of the Metaphysics of Morals",
      "Perpetual Peace"
    ]
  },
  {
    year: "19th Century",
    title: "John Stuart Mill",
    slug: "john-stuart-mill",
    description: "Utilitarianism, liberty, political philosophy.",
    containerImage: "",
    fullBio: `John Stuart Mill (1806–1873) was an English philosopher, political economist, and civil servant who was one of the most influential thinkers in the history of classical liberalism. He contributed widely to social theory, political theory, and political economy. A proponent of utilitarianism, Mill refined the ethical theory originally formulated by his godfather Jeremy Bentham. Mill's harm principle, which states that people should be free to act however they wish unless their actions cause harm to others, has influenced modern liberal thought. He was also an advocate for women's rights and individual liberty.`,
    keyIdeas: [
      "Utilitarianism - actions are right if they promote happiness, wrong if they produce unhappiness",
      "The harm principle - people should be free to act unless they harm others",
      "Higher and lower pleasures - intellectual pleasures are superior to physical ones",
      "Liberty of thought and discussion is essential for social progress",
      "Women should have equal rights and opportunities"
    ],
    quotes: [
      "It is better to be a human being dissatisfied than a pig satisfied; better to be Socrates dissatisfied than a fool satisfied.",
      "The only freedom which deserves the name is that of pursuing our own good in our own way.",
      "Bad men need nothing more to compass their ends, than that good men should look on and do nothing.",
      "Over himself, over his own body and mind, the individual is sovereign."
    ],
    majorWorks: [
      "On Liberty",
      "Utilitarianism",
      "The Subjection of Women",
      "A System of Logic",
      "Principles of Political Economy"
    ]
  },
  {
    year: "19th Century",
    title: "Friedrich Nietzsche",
    slug: "friedrich-nietzsche",
    description: "Nihilism, morality and the Übermensch.",
    containerImage: "",
    fullBio: `Friedrich Nietzsche (1844–1900) was a German philosopher, cultural critic, and philologist whose work has exerted a profound influence on modern intellectual history. Nietzsche's writings challenged the foundations of Christianity and traditional morality, which he believed had become life-denying and nihilistic. He proclaimed the "death of God" and explored its consequences for human values and meaning. His concept of the Übermensch (superman or overman) represented a person who has overcome conventional morality to create their own values. Though often misunderstood and misappropriated, Nietzsche's philosophy emphasized individual strength, creativity, and the affirmation of life.`,
    keyIdeas: [
      "God is dead - traditional religious and metaphysical foundations have collapsed",
      "The Übermensch - the ideal person who creates their own values",
      "Will to power - the fundamental drive in humans is to assert and expand power",
      "Eternal recurrence - imagine living your life over and over infinitely",
      "Master-slave morality - critique of Christian morality as 'slave morality'"
    ],
    quotes: [
      "That which does not kill us makes us stronger.",
      "He who has a why to live can bear almost any how.",
      "God is dead. God remains dead. And we have killed him.",
      "Without music, life would be a mistake.",
      "To live is to suffer, to survive is to find some meaning in the suffering."
    ],
    majorWorks: [
      "Thus Spoke Zarathustra",
      "Beyond Good and Evil",
      "The Gay Science",
      "On the Genealogy of Morality",
      "Twilight of the Idols"
    ]
  },
  {
    year: "20th Century",
    title: "Jean-Paul Sartre",
    slug: "jean-paul-sartre",
    description: "Existentialism, freedom, responsibility.",
    containerImage: "",
    fullBio: `Jean-Paul Sartre (1905–1980) was a French philosopher, playwright, novelist, screenwriter, political activist, and literary critic who was a leading figure in 20th-century French philosophy and existentialism. Sartre's philosophy emphasized individual freedom, choice, and responsibility. He famously declared that "existence precedes essence," meaning that humans first exist and then define themselves through their actions and choices. Sartre rejected the idea of human nature, arguing instead that we are "condemned to be free" and must create our own meaning and values in an absurd, godless universe.`,
    keyIdeas: [
      "Existence precedes essence - we exist first, then create who we are through choices",
      "Radical freedom - humans are fundamentally free and responsible for their choices",
      "Bad faith - self-deception and denying one's own freedom",
      "Hell is other people - our sense of self depends on how others see us",
      "We are condemned to be free - freedom brings anxiety and responsibility"
    ],
    quotes: [
      "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.",
      "Hell is other people.",
      "We are our choices.",
      "Everything has been figured out, except how to live.",
      "Freedom is what you do with what's been done to you."
    ],
    majorWorks: [
      "Being and Nothingness",
      "Existentialism is a Humanism",
      "No Exit (play)",
      "Nausea (novel)",
      "Critique of Dialectical Reason"
    ]
  },
  {
    year: "20th Century",
    title: "Albert Camus",
    slug: "albert-camus",
    description: "Central figure in Absurdism. Wrote The Myth of Sisyphus.",
    containerImage: "",
    fullBio: `Albert Camus (1913–1960) was a French philosopher, author, and journalist who was a central figure in the philosophy of absurdism. Born in Algeria, Camus explored the question of whether life is worth living in a universe that appears meaningless. Unlike nihilists who saw meaninglessness as cause for despair, Camus argued that we should embrace the absurd and find happiness despite it. His most famous philosophical essay, "The Myth of Sisyphus," uses the Greek myth to illustrate how we can find meaning and happiness even in futile struggle. Camus was awarded the Nobel Prize in Literature in 1957.`,
    keyIdeas: [
      "The Absurd - the conflict between human need for meaning and the universe's silence",
      "We must imagine Sisyphus happy - find joy in struggle itself",
      "Revolt against the absurd through living fully",
      "Philosophical suicide - escaping the absurd through religion or hope",
      "Embrace life's meaninglessness and create your own meaning"
    ],
    quotes: [
      "The struggle itself toward the heights is enough to fill a man's heart. One must imagine Sisyphus happy.",
      "In the depth of winter, I finally learned that within me there lay an invincible summer.",
      "You will never be happy if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life.",
      "Should I kill myself, or have a cup of coffee?"
    ],
    majorWorks: [
      "The Myth of Sisyphus",
      "The Stranger (novel)",
      "The Plague (novel)",
      "The Rebel",
      "The Fall (novel)"
    ]
  },
  {
    year: "20th Century",
    title: "Simone de Beauvoir",
    slug: "simone-de-beauvoir",
    description: "Human rights, feminism, existentialism.",
    containerImage: "",
    fullBio: `Simone de Beauvoir (1908–1986) was a French writer, intellectual, existentialist philosopher, political activist, and social theorist. Though she did not consider herself a philosopher in her lifetime, she had a significant influence on feminist existentialism and feminist theory. Her groundbreaking work "The Second Sex" provided a detailed analysis of women's oppression and a foundational treatise of contemporary feminism. De Beauvoir examined how women have been historically defined as "the Other" by men, and argued that women are not born but made through social conditioning. She advocated for women's liberation and economic independence.`,
    keyIdeas: [
      "One is not born, but rather becomes, a woman - gender is socially constructed",
      "Women have been defined as 'the Other' in relation to men",
      "Women's liberation requires economic independence",
      "Ethics of ambiguity - humans are fundamentally free and must create their own values",
      "Existential feminism - combining existentialism with feminist critique"
    ],
    quotes: [
      "One is not born, but rather becomes, a woman.",
      "I am too intelligent, too demanding, and too resourceful for anyone to be able to take charge of me entirely.",
      "To lose confidence in one's body is to lose confidence in oneself.",
      "The most sympathetic of men never fully comprehend woman's concrete situation.",
      "Few tasks are more like the torture of Sisyphus than housework, with its endless repetition."
    ],
    majorWorks: [
      "The Second Sex",
      "The Ethics of Ambiguity",
      "She Came to Stay (novel)",
      "The Mandarins (novel)",
      "Memoirs of a Dutiful Daughter"
    ]
  }
];

