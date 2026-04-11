import { useEffect } from "react";
import useItems from "../../../Items/Hook/useItems";
import "./Install.scss";

export default function Install() {

    return (

        <section id="install" className="install">


            <p className="section-label">

                Get started in 2 minutes

            </p>



            <h2 className="section-title">

                Install the
                <br />

                <em>extension</em>

            </h2>



            <div className="steps">

                <Step
                    number="01"
                    title="Download extension"
                    desc="Download ZIP file."
                    active
                />


                <Step
                    number="02"
                    title="Open Chrome extensions"
                    desc="Go to extensions page."
                    code="chrome://extensions"
                />


                <Step
                    number="03"
                    title="Enable developer mode"
                    desc="Toggle switch in top right."
                />


                <Step
                    number="04"
                    title="Load unpacked"
                    desc="Select extracted folder."
                />

            </div>



            <div className="download-cta">

                <a
                    href='../../../../../../../../public/extension.zip' 
                    download="Vexa Clipper.zip"
                    className="btn btn-primary btn-lg"
                >

                    Download Vexa clipper.zip

                </a>

            </div>



        </section>

    );

}



function Step({ number, title, desc, code, active }) {

    return (

        <div className="step">

            <div className={`step-num ${active ? "step-num--active" : "step-num--dim"}`}>

                {number}

            </div>


            <div>

                <div className="step-title">

                    {title}

                </div>


                <div className="step-desc">

                    {desc}

                </div>



                {code && (

                    <span className="step-code">

                        {code}

                    </span>

                )}

            </div>

        </div>

    );

}