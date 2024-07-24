import { useState } from "react";
import ArcordionItem from "../partials/ArcordionItem";

const Faq = () => {

    const [menus, setMenus] = useState([false, false]);

    return (
        <section id="qa" className="faq-section" >
            <div
                className="container"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
            >
                <div className="faq-wrapper" >

                    <div className="faq-heading-paragraph-wrapper">
                        <div className="section-title">Q&amp;A</div>
                        <h2 className="section-heading middle-allign">Veelgestelde Vragen 🙋</h2>
                        <p className="faq-paragraph middle-allign">Ontdek antwoorden op veelgestelde vragen en kom meer te weten over de
                            mogelijkheden van fysio.ai. Staat je vraag er niet tussen? Stuur ons gerust een bericht op <a
                                href="mailto:info@fysio.ai" target="_new">info@fysio.ai</a>.</p>
                    </div>

                    <div className="dropdown-wrapper">

                        <ArcordionItem
                            title="Hoe nauwkeurig is de AI bij het herkennen van fysiotherapeutische terminologie?"
                            content="Fysio.ai is specifiek getraind op de fysiotherapeutische terminologie en levert een output die de nauwkeurigheid en het professionalisme van een ervaren fysiotherapeut evenaart."
                            isOpen={menus[0]}
                            setMenus={setMenus}
                            index={0}
                        />

                        <ArcordionItem
                            title="In hoeverre verschilt fysio.ai van standaard transcriptie technologie?"
                            content="Fysio.ai gaat veel verder dan traditionele transcriptie technologieën door
                            niet alleen gesprekken woord voor woord vast te leggen, maar ook door de relevante informatie te
                            filteren en te structureren. Ons systeem herkent en registreert de belangrijkste medische informatie,
                            zelfs als de conversatie afdwaalt van het onderwerp. Zo blijft de focus altijd op de essentiële punten,
                            ongeacht hoe het gesprek verloopt."
                            isOpen={menus[1]}
                            setMenus={setMenus}
                            index={1}
                        />

                        <ArcordionItem
                            title="Heb ik een microphone nodig voor de opname?"
                            content="Een ingebouwde microfoon van een laptop volstaat voor heldere opnames met
                            fysio.ai. Extra apparatuur is niet nodig."
                            isOpen={menus[2]}
                            setMenus={setMenus}
                            index={2}
                        />

                        <ArcordionItem
                            title="Kan ik fysio.ai gebruiken voor gesprekken in verschillende talen?"
                            content="Ja, fysio.ai ondersteunt meerdere talen en zet gesprekken om in een
                            Nederlandse output, ongeacht de taal van het gesprek."
                            isOpen={menus[3]}
                            setMenus={setMenus}
                            index={3}
                        />

                        <ArcordionItem
                            title={<>Is er een limiet aan de lengte of het aantal opnames dat fysio.ai <br />kan
                                verwerken?
                            </>}
                            content="Fysio.ai is geoptimaliseerd voor opnames tot 30 minuten, passend bij de
                            gemiddelde duur van een anamnese. Indien nodig, kunnen we de duur in overleg aanpassen om aan de
                            specifieke behoeften van uw praktijk te voldoen."
                            isOpen={menus[4]}
                            setMenus={setMenus}
                            index={4}
                        />

                        <ArcordionItem
                            title="Hoe snel worden de opnames verwerkt en zijn de notities beschikbaar?"
                            content="Het volledig gestructureerde rapport, ingedeeld in vijf duidelijke
                            categorieën, is klaar binnen één minuut na het afronden van de opname. Wij werken voortdurend aan
                            verbeteringen om deze verwerkingstijd nog verder te versnellen."
                            isOpen={menus[5]}
                            setMenus={setMenus}
                            index={5}
                        />
                        <ArcordionItem
                            title="Zijn er naast de anamnese nog ander functionaliteiten die ik kan gebruiken?"
                            content="Op dit moment hebben we de functionaliteit voor het genereren van een
                            anamnese. We zijn actief bezig met het ontwikkelen van extra toepassingen zoals geautomatiseerde
                            behandelplannen en het vastleggen van bevindingen, om de praktijkvoering verder te vereenvoudigen."
                            isOpen={menus[6]}
                            setMenus={setMenus}
                            index={6}
                        />

                        <ArcordionItem
                            title="Hoe waarborgt fysio.ai de privacy en veiligheid van patiëntgegevens?"
                            content="Fysio.ai hanteert strikte normen voor privacy en databeveiliging, conform
                            Europese wetgeving. Audio-opnames worden niet opgeslagen; ze worden direct na verwerking verwijderd.
                            Onze servers, gevestigd binnen de EU, garanderen dat patiëntgegevens veilig en vertrouwelijk blijven"
                            isOpen={menus[7]}
                            setMenus={setMenus}
                            index={7}
                        />

                        <ArcordionItem
                            title='In welke vijf categorieën wordt de output gegenereerd?'
                            content={<>
                                Fysio.ai is nauwgezet ontworpen volgens de professioneel vastgestelde
                                richtlijnen, waarbij de gegevens worden ingedeeld in de vijf essentiële categorieën:<br />‍<br />1.
                                Hulpvraag patiënt of contactreden<br />2. Functioneringsproblemen en beloop<br />3. Medische
                                gezondheidsdeterminanten<br />4. Omgevingsdeterminanten<br />5. Persoonlijke determinanten<br />
                            </>}
                            isOpen={menus[8]}
                            setMenus={setMenus}
                            index={8}
                        />
                    </div>

                    <img
                        src="/images/Group-13_1Group-13.webp"
                        loading="lazy"
                        alt=""
                        width="141"
                        className="faq-svg"
                    />

                    <img
                        src="/images/Group-12_1Group-12.webp"
                        loading="lazy"
                        alt=""
                        width="124"
                        className="faq-svg-bottom" />
                </div>
            </div>
        </section>
    )
}

export default Faq