import React from "react";
import Typewriter from "typewriter-effect";

const Border =({text})=> (
<Typewriter options ={
    {
        strings:text,
        autoStart:true,
        loop:true
    }
} />
);

export default Border;