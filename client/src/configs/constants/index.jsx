import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export const ENUM_STATUS = {
    NONE: 'none',
    START: 'start',
    PAUSE: 'pause',
    STOP: 'stop'
}

export const navItems = [
    { id: 1, text: 'Aanpak', href: '#aanpak' },
    { id: 2, text: 'Voordelen', href: '#voordelen' },
    { id: 3, text: 'Ervaringen', href: '#ervaringen' },
    { id: 4, text: 'Q&A', href: '#qa' },
    { id: 5, text: 'Contact', href: '#contact' },
];

export const checkpoints = [
    {
        icon: <IoIosCheckmarkCircleOutline />,
        text: "<strong>Tijdbesparing:</strong> Automatiseer uw intakeproces en bespaar tot 20 minuten per patiënt.",
    },
    {
        icon: <IoIosCheckmarkCircleOutline />,
        text: "<strong>Gebruiksgemak:</strong> Intuïtieve interface voor eenvoudige bediening zonder technische hindernissen.",
    },
    {
        icon: <IoIosCheckmarkCircleOutline />,
        text: "<strong>Volledige Aandacht:</strong> Laat het noteren over aan fysio.ai en voer gesprekken zonder afleiding.",
    },
    {
        icon: <IoIosCheckmarkCircleOutline />,
        text: "<strong>Veiligheid: </strong>Veilige opslag en verwerking van patiëntgesprekken met volledige naleving van privacywetten.",
    },
    {
        icon: <IoIosCheckmarkCircleOutline />,
        text: "<strong>Professioneel en Precies:</strong> Ons AI-model is getraind in fysiotherapeutisch jargon, zodat elke interactie vakkundig en in de juiste terminologie wordt vastgelegd. Daarnaast wordt alleen de relevante informatie uit het gesprek gefilterd.",
    },
];

export const modalData = [
    { title: 'Hulpvraag patiënt (of contactreden)', id: 'feedbackModal1', label: 'feedbackModal1Label' },
    { title: 'Functioneringsproblemen en beloop', id: 'feedbackModal2', label: 'feedbackModal2Label' },
    { title: 'Medische gezondheidsdeterminanten', id: 'feedbackModal3', label: 'feedbackModal3Label' },
    { title: 'Omgevingsdeterminanten', id: 'feedbackModal4', label: 'feedbackModal4Label' },
    { title: 'Persoonlijke determinanten', id: 'feedbackModal5', label: 'feedbackModal5Label' },
];

export const faqDatas = [
    {
        title: 'Hoe nauwkeurig is de AI bij het herkennen van fysiotherapeutische terminologie?',
        content: 'Fysio.ai is specifiek getraind op de fysiotherapeutische terminologie en levert een output die de nauwkeurigheid en het professionalisme van een ervaren fysiotherapeut evenaart.',
    },
    {
        title: 'In hoeverre verschilt fysio.ai van standaard transcriptie technologie?',
        content: 'Fysio.ai gaat veel verder dan traditionele transcriptie technologieën door niet alleen gesprekken woord voor woord vast te leggen, maar ook door de relevante informatie te filteren en te structureren. Ons systeem herkent en registreert de belangrijkste medische informatie, zelfs als de conversatie afdwaalt van het onderwerp. Zo blijft de focus altijd op de essentiële punten, ongeacht hoe het gesprek verloopt.',
    },
    {
        title: 'Heb ik een microphone nodig voor de opname?',
        content: 'Een ingebouwde microfoon van een laptop volstaat voor heldere opnames met fysio.ai. Extra apparatuur is niet nodig.',
    },
    {
        title: 'Kan ik fysio.ai gebruiken voor gesprekken in verschillende talen?',
        content: 'Ja, fysio.ai ondersteunt meerdere talen en zet gesprekken om in een Nederlandse output, ongeacht de taal van het gesprek.',
    },
    {
        title: 'Is er een limiet aan de lengte of het aantal opnames dat fysio.ai kan verwerken?',
        content: 'Fysio.ai is geoptimaliseerd voor opnames tot 30 minuten, passend bij de gemiddelde duur van een anamnese. Indien nodig, kunnen we de duur in overleg aanpassen om aan de specifieke behoeften van uw praktijk te voldoen.',
    },
    {
        title: 'Hoe snel worden de opnames verwerkt en zijn de notities beschikbaar?',
        content: 'Het volledig gestructureerde rapport, ingedeeld in vijf duidelijke categorieën, is klaar binnen één minuut na het afronden van de opname. Wij werken voortdurend aan verbeteringen om deze verwerkingstijd nog verder te versnellen.',
    },
    {
        title: 'Zijn er naast de anamnese nog andere functionaliteiten die ik kan gebruiken?',
        content: 'Op dit moment hebben we de functionaliteit voor het genereren van een anamnese. We zijn actief bezig met het ontwikkelen van extra toepassingen zoals geautomatiseerde behandelplannen en het vastleggen van bevindingen, om de praktijkvoering verder te vereenvoudigen.',
    },
    {
        title: 'Hoe waarborgt fysio.ai de privacy en veiligheid van patiëntgegevens?',
        content: 'Fysio.ai hanteert strikte normen voor privacy en databeveiliging, conform Europese wetgeving. Audio-opnames worden niet opgeslagen; ze worden direct na verwerking verwijderd. Onze servers, gevestigd binnen de EU, garanderen dat patiëntgegevens veilig en vertrouwelijk blijven.',
    },
    {
        title: 'In welke vijf categorieën wordt de output gegenereerd?',
        content: 'Fysio.ai is nauwgezet ontworpen volgens de professioneel vastgestelde richtlijnen, waarbij de gegevens worden ingedeeld in de vijf essentiële categorieën:\n\n1. Hulpvraag patiënt of contactreden\n2. Functioneringsproblemen en beloop\n3. Medische gezondheidsdeterminanten\n4. Omgevingsdeterminanten\n5. Persoonlijke determinanten',
    },
];