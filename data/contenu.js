var DATA_CONTENU = {
  settings: {
    name: "Aldéris",
    tagline:
      "Parcourez les chroniques, consultez le wiki et suivez les fils de la Trame à travers un monde éclairé par deux lunes.",
    accent: "#86cdf5",
    sky: true,
    anim: true,
    density: 1,
    collapsed: false,
  },
  chronicles: [
    {
      id: "c-phare",
      title: "Le Phare sans flamme",
      date: "An 415, mois des Cendres",
      tag: "Arc II",
      summary:
        "Fort-Veille s’éteint pour la première fois depuis la fondation de l’Ordre.",
      body: "Pour la première fois depuis la fondation de l'Ordre, les trois feux du phare de Fort-Veille se sont éteints en même temps. Les veilleurs de garde jurent n'avoir rien vu, rien entendu.\n\nLa [[La Trame|Trame]] vibrait, disent-ils, comme une corde qu'on vient de lâcher. Une enquête est ouverte, et [[Maëlis Corvane]] a interdit à quiconque de rallumer le phare avant d'en connaître la cause.\n\n## Ce que l'on sait\n\n- Les trois feux se sont éteints à la même minute\n- Orm était basse sur l'horizon, d'un rouge inhabituel\n- Aucun veilleur n'a quitté son poste cette nuit-là",
    },
    {
      id: "c-pacte",
      title: "Le Pacte de Vellmar",
      date: "An 413, mois des Semailles",
      tag: "Arc I",
      summary:
        "Les cités du sud placent leurs greniers sous la garde de l’Ordre, à contrecœur.",
      body: "Les cités du Val de Vellmar ont accepté de placer leurs greniers sous la garde de l'[[Ordre des Veilleurs]]. En échange, l'Ordre s'engage à ne jamais fermer les routes du sud.\n\nLe pacte tient en une page. [[Maëlis Corvane]] l'a signé la première, puis a quitté la salle avant les discours, ce que les cités ont pris pour un affront.",
    },
    {
      id: "c-lunes",
      title: "La Nuit des Deux Lunes",
      date: "An 412, mois des Brumes",
      tag: "Arc I",
      summary:
        "Séléa et Orm se rejoignent au-dessus des Hautes-Brumes, et la Trame s’ouvre.",
      body: "Cette année-là, [[Les Deux Lunes|Séléa et Orm]] se sont rejointes au-dessus des [[Les Hautes-Brumes|Hautes-Brumes]], et la brume s'est levée pour la première fois depuis des siècles.\n\nOn raconte que [[Maëlis Corvane]] a passé la nuit sur la tour de Fort-Veille, les yeux fixés sur [[La Trame|les fils de lumière]] qui descendaient du ciel. Au matin, trois villages avaient perdu leur nom de mémoire, et personne n'a su dire lequel était le plus proche de la faille.\n\n## Ce qui a changé\n\n- Les passes du nord sont restées fermées pendant onze jours\n- Les [[Les Cendreux|Cendreux]] ont envoyé une ambassade pour la première fois\n- Orm est restée rouge jusqu'à l'hiver",
    },
  ],
  wiki: [
    {
      id: "w-monde",
      cat: "Monde",
      plane: "material",
      title: "Aldéris",
      summary: "Le monde connu, enveloppé de brume et éclairé par deux lunes.",
      fields: [
        ["Type", "Monde habité"],
        ["Lunes", "[[Les Deux Lunes|Séléa et Orm]]"],
        ["Calendrier", "Années depuis la Chute, An 415 en cours"],
        ["Magie", "[[La Trame]]"],
      ],
      body: "Aldéris est un monde de plateaux, de forêts hautes et de côtes que la brume ne quitte jamais tout à fait. Ses habitants disent qu'il est né d'une étoile tombée, dont les restes forment [[La Trame]].\n\n## Régions\n\n- [[Les Hautes-Brumes]], plateaux du nord\n- Le Val de Vellmar, grenier du sud\n- Les Marches cendrées, terres des [[Les Cendreux|Cendreux]], à l'est\n\n## Pouvoirs en place\n\nAucun royaume ne tient tout le continent. L'[[Ordre des Veilleurs]] garde les passes de la Trame et arbitre les conflits entre les cités libres.",
    },
    {
      id: "w-lunes",
      cat: "Cosmos",
      plane: "material",
      title: "Les Deux Lunes",
      summary:
        "Séléa la blanche règle les saisons, Orm la cendrée annonce les orages de la Trame.",
      fields: [
        ["Séléa", "Lune blanche, cycle de 29 jours"],
        ["Orm", "Lune cendrée, cycle de 71 jours"],
        ["Alignement", "Tous les sept ans environ"],
      ],
      body: "Séléa règle les marées et les semailles. Orm, plus petite et plus lente, pâlit ou rougit selon l'état de [[La Trame]].\n\n## L'alignement\n\nQuand les deux lunes se rejoignent, la Trame devient visible à l'œil nu. Les [[Ordre des Veilleurs|Veilleurs]] scellent alors les passes. Le dernier alignement a donné lieu à [[La Nuit des Deux Lunes]].",
    },
    {
      id: "w-brumes",
      cat: "Lieu",
      plane: "material",
      title: "Les Hautes-Brumes",
      summary:
        "Plateaux du nord, battus par une brume que le vent ne dissipe jamais.",
      fields: [
        ["Type", "Plateau"],
        ["Climat", "Brume permanente, hivers longs"],
        ["Place forte", "Fort-Veille"],
        ["Dirigeante", "[[Maëlis Corvane]]"],
      ],
      body: "Les Hautes-Brumes s'élèvent à mille mètres au-dessus de la côte. On n'y cultive que l'orge et le lichen, et l'on y élève des chèvres à la laine épaisse.\n\nLes routes sont balisées par des cairns que les veilleurs repeignent chaque automne. Qui s'écarte du balisage se perd, parfois pour de bon.\n\n## Fort-Veille\n\nSiège de l'[[Ordre des Veilleurs]], bâti autour d'un phare à trois feux que l'on voit de la plaine par temps clair.",
    },
    {
      id: "w-ordre",
      cat: "Faction",
      plane: "material",
      title: "Ordre des Veilleurs",
      summary:
        "Gardiens des passes de la Trame, installés à Fort-Veille depuis l’An 37.",
      fields: [
        ["Fondation", "An 37"],
        ["Siège", "Fort-Veille, [[Les Hautes-Brumes]]"],
        ["Emblème", "Un phare à trois feux"],
        ["Dirigeante", "[[Maëlis Corvane]]"],
      ],
      body: "L'Ordre naît d'un serment simple : surveiller le ciel et fermer les passes quand la [[La Trame|Trame]] s'ouvre. Ses membres ne possèdent rien en propre et logent au fort.\n\n## Organisation\n\nChaque veilleur choisit une lune à suivre, [[Les Deux Lunes|Séléa ou Orm]], et tient un registre de ses variations pendant toute sa vie.",
    },
    {
      id: "w-maelis",
      cat: "Personnage",
      plane: "material",
      title: "Maëlis Corvane",
      summary:
        "Haute-Veilleuse, connue pour ses silences et son registre jamais ouvert devant témoin.",
      fields: [
        ["Titre", "Haute-Veilleuse"],
        ["Peuple", "Humaine"],
        ["Âge", "54 ans"],
        ["Affiliation", "[[Ordre des Veilleurs]]"],
      ],
      body: "Maëlis Corvane dirige l'[[Ordre des Veilleurs]] depuis onze ans. Elle parle peu, écrit beaucoup, et ne laisse personne lire son registre.\n\nElle a signé le pacte de Vellmar le jour même où elle a appris qu'elle devrait le rompre. Personne, à Fort-Veille, ne sait pourquoi.",
    },
    {
      id: "w-trame",
      cat: "Magie",
      plane: "astral",
      title: "La Trame",
      summary:
        "Réseau de fils lumineux hérité d’une étoile tombée, lisible à l’œil nu quand les lunes s’alignent.",
      fields: [
        ["Source", "Résidus d’une étoile tombée"],
        ["Lecture", "À l’œil nu, par ciel dégagé"],
        ["Coût", "La fatigue, puis l’oubli"],
      ],
      body: "La Trame est ce qui reste de l'étoile qui a donné naissance à [[Aldéris]]. On la voit comme une dentelle de lumière, plus nette les nuits où [[Les Deux Lunes|les deux lunes]] s'alignent.\n\n## Tirer un fil\n\nUn lecteur de la Trame peut déplacer une vibration d'un point à un autre. Chaque fil tiré coûte un souvenir, d'abord petit, puis de moins en moins.",
    },
    {
      id: "w-cendreux",
      cat: "Peuple",
      plane: "material",
      title: "Les Cendreux",
      summary:
        "Peuple des Marches cendrées, à la peau grise et aux yeux ambrés.",
      fields: [
        ["Habitat", "Marches cendrées"],
        ["Longévité", "Environ 90 ans"],
        ["Langue", "Cendrien"],
        ["Relations", "Méfiants envers l’[[Ordre des Veilleurs]]"],
      ],
      body: "Les Cendreux vivent à l'est, là où les sols gardent la couleur des anciens incendies. Ils disent que leurs ancêtres ont marché dans la [[La Trame|Trame]] et qu'elle les a teints.\n\nIls tiennent leurs comptes sur des cordes nouées, et s'étonnent que d'autres peuples écrivent sur des surfaces qui brûlent.",
    },
    {
      id: "w-braise",
      cat: "Lieu",
      plane: "fire",
      title: "Citadelle de Braise",
      summary:
        "Forteresse d’obsidienne bâtie sur un fleuve de lave qui ne refroidit jamais.",
      fields: [
        ["Type", "Forteresse"],
        ["Habitants", "Forgerons et ambassadeurs des flammes"],
      ],
      body: "La Citadelle de Braise domine un fleuve de lave aussi large qu'une mer. Ses murailles d'obsidienne se fendent chaque soir et sont refaites chaque matin par ses habitants.\n\nLes voyageurs venus du [[Plan matériel]] y sont reçus avec méfiance, mais jamais refusés : l'hospitalité y est une affaire de feu partagé.",
    },
    {
      id: "w-nuees",
      cat: "Lieu",
      plane: "air",
      title: "Archipel des Nuées",
      summary: "Îles de pierre légère qui dérivent au gré des vents éternels.",
      fields: [
        ["Type", "Archipel flottant"],
        ["Dangers", "Tempêtes vivantes"],
      ],
      body: "Les îles de l'Archipel des Nuées ne restent jamais au même endroit. Les pilotes de vent y tracent des cartes qui ne valent que pour une journée.\n\nUne route relie encore l'archipel au [[Plan matériel]], mais elle change de sommet à chaque saison.",
    },
    {
      id: "w-cloches",
      cat: "Lieu",
      plane: "upper",
      title: "Cité des Cent Cloches",
      summary: "Cité de lumière dont les cloches sonnent le jugement des âmes.",
      fields: [
        ["Type", "Cité sacrée"],
        ["Accès", "Sur invitation"],
      ],
      body: "Chaque tour de la Cité des Cent Cloches abrite une cloche qui sonne une vertu. On dit que l'on n'y entre qu'en répondant sincèrement à la question que la cloche pose.\n\nLes voyageurs y arrivent par le [[Plan astral]] et en repartent changés.",
    },
    {
      id: "w-fosse",
      cat: "Lieu",
      plane: "lower",
      title: "La Fosse sans Fond",
      summary:
        "Gouffre vertigineux dont chaque palier est tenu par un seigneur de la ruine.",
      fields: [
        ["Type", "Gouffre"],
        ["Dangers", "Tous"],
      ],
      body: "Personne n'a jamais touché le fond de la Fosse. Chaque palier est tenu par un seigneur qui convoite le monde des vivants, et les failles qui s'ouvrent parfois dans le [[Plan matériel]] mènent toutes à l'un de ces paliers.",
    },
  ],
  links: [
    {
      id: "l1",
      label: "Carte du monde",
      url: "https://example.com/carte",
      note: "Carte interactive des royaumes et des routes",
    },
    {
      id: "l2",
      label: "Dossier de campagne",
      url: "https://example.com/campagne",
      note: "Notes de session et plans à venir",
    },
    {
      id: "l3",
      label: "Serveur Discord",
      url: "https://example.com/discord",
      note: "Discussion avec les joueurs",
    },
  ],
};
