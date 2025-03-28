export function Diagram() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height={672} viewBox="0 0 672 432" style={{ fontFamily: "inherit" }}>
            <g transform="translate(8,16 )">
                <g stroke="black" fill="none">
                    <path d="M8,0 V64" />
                    <path d="M120,0 V64" />
                    <path d="M176,0 V64" />
                    <path d="M296,0 V64" />
                    <path d="M352,0 V64" />
                    <path d="M352,112 V176" />
                    <path d="M352,224 V288" />
                    <path d="M352,336 V400" />
                    <path d="M416,64 V104" />
                    <path d="M416,176 V216" />
                    <path d="M416,288 V328" />
                    <path d="M480,0 V64" />
                    <path d="M480,112 V176" />
                    <path d="M480,224 V288" />
                    <path d="M480,336 V400" />
                    <path d="M536,336 V400" />
                    <path d="M648,336 V400" />
                </g>

                <g stroke="black" fill="none">
                    <path d="M8,0 H120" />
                    <path d="M176,0 H296" />
                    <path d="M352,0 H480" />
                    <path d="M120,32 H168" />
                    <path d="M296,32 H344" />
                    <path d="M8,64 H120" />
                    <path d="M176,64 H296" />
                    <path d="M352,64 H480" />
                    <path d="M352,112 H480" />
                    <path d="M352,176 H480" />
                    <path d="M352,224 H480" />
                    <path d="M352,288 H480" />
                    <path d="M352,336 H480" />
                    <path d="M536,336 H648" />
                    <path d="M480,368 H528" />
                    <path d="M352,400 H480" />
                    <path d="M536,400 H648" />
                </g>
                <polygon points="536,368 524,362.4 524,373.6" stroke="none" transform="rotate(0,528,368)" />
                <polygon points="424,328 412,322.4 412,333.6" stroke="none" transform="rotate(90,416,328)" />
                <polygon points="424,216 412,210.4 412,221.6" stroke="none" transform="rotate(90,416,216)" />
                <polygon points="424,104 412,98.4 412,109.6" stroke="none" transform="rotate(90,416,104)" />
                <polygon points="352,32 340,26.4 340,37.6" stroke="none" transform="rotate(0,344,32)" />
                <polygon points="176,32 164,26.4 164,37.6" stroke="none" transform="rotate(0,168,32)" />

                {/* <g transform="translate(0,0)">
                    <text textAnchor="middle" x="48" y="20">
                        S
                    </text>
                    <text textAnchor="middle" x="56" y="20">
                        c
                    </text>
                    <text textAnchor="middle" x="64" y="20">
                        e
                    </text>
                    <text textAnchor="middle" x="72" y="20">
                        n
                    </text>
                    <text textAnchor="middle" x="80" y="20">
                        e
                    </text>
                    <text textAnchor="middle" x="200" y="20">
                        N
                    </text>
                    <text textAnchor="middle" x="208" y="20">
                        o
                    </text>
                    <text textAnchor="middle" x="216" y="20">
                        r
                    </text>
                    <text textAnchor="middle" x="224" y="20">
                        m
                    </text>
                    <text textAnchor="middle" x="232" y="20">
                        a
                    </text>
                    <text textAnchor="middle" x="240" y="20">
                        l
                    </text>
                    <text textAnchor="middle" x="248" y="20">
                        i
                    </text>
                    <text textAnchor="middle" x="256" y="20">
                        z
                    </text>
                    <text textAnchor="middle" x="264" y="20">
                        e
                    </text>
                    <text textAnchor="middle" x="272" y="20">
                        d
                    </text>
                    <text textAnchor="middle" x="32" y="36">
                        l
                    </text>
                    <text textAnchor="middle" x="40" y="36">
                        u
                    </text>
                    <text textAnchor="middle" x="48" y="36">
                        m
                    </text>
                    <text textAnchor="middle" x="56" y="36">
                        i
                    </text>
                    <text textAnchor="middle" x="64" y="36">
                        n
                    </text>
                    <text textAnchor="middle" x="72" y="36">
                        a
                    </text>
                    <text textAnchor="middle" x="80" y="36">
                        n
                    </text>
                    <text textAnchor="middle" x="88" y="36">
                        c
                    </text>
                    <text textAnchor="middle" x="96" y="36">
                        e
                    </text>
                    <text textAnchor="middle" x="200" y="36">
                        l
                    </text>
                    <text textAnchor="middle" x="208" y="36">
                        u
                    </text>
                    <text textAnchor="middle" x="216" y="36">
                        m
                    </text>
                    <text textAnchor="middle" x="224" y="36">
                        i
                    </text>
                    <text textAnchor="middle" x="232" y="36">
                        n
                    </text>
                    <text textAnchor="middle" x="240" y="36">
                        a
                    </text>
                    <text textAnchor="middle" x="248" y="36">
                        n
                    </text>
                    <text textAnchor="middle" x="256" y="36">
                        c
                    </text>
                    <text textAnchor="middle" x="264" y="36">
                        e
                    </text>
                    <text textAnchor="middle" x="368" y="36">
                        W
                    </text>
                    <text textAnchor="middle" x="376" y="36">
                        h
                    </text>
                    <text textAnchor="middle" x="384" y="36">
                        i
                    </text>
                    <text textAnchor="middle" x="392" y="36">
                        t
                    </text>
                    <text textAnchor="middle" x="400" y="36">
                        e
                    </text>
                    <text textAnchor="middle" x="416" y="36">
                        b
                    </text>
                    <text textAnchor="middle" x="424" y="36">
                        a
                    </text>
                    <text textAnchor="middle" x="432" y="36">
                        l
                    </text>
                    <text textAnchor="middle" x="440" y="36">
                        a
                    </text>
                    <text textAnchor="middle" x="448" y="36">
                        n
                    </text>
                    <text textAnchor="middle" x="456" y="36">
                        c
                    </text>
                    <text textAnchor="middle" x="464" y="36">
                        e
                    </text>
                    <text textAnchor="middle" x="216" y="52">
                        (
                    </text>
                    <text textAnchor="middle" x="224" y="52">
                        H
                    </text>
                    <text textAnchor="middle" x="232" y="52">
                        D
                    </text>
                    <text textAnchor="middle" x="240" y="52">
                        R
                    </text>
                    <text textAnchor="middle" x="248" y="52">
                        )
                    </text>
                    <text textAnchor="middle" x="368" y="148">
                        C
                    </text>
                    <text textAnchor="middle" x="376" y="148">
                        o
                    </text>
                    <text textAnchor="middle" x="384" y="148">
                        l
                    </text>
                    <text textAnchor="middle" x="392" y="148">
                        o
                    </text>
                    <text textAnchor="middle" x="400" y="148">
                        r
                    </text>
                    <text textAnchor="middle" x="416" y="148">
                        g
                    </text>
                    <text textAnchor="middle" x="424" y="148">
                        r
                    </text>
                    <text textAnchor="middle" x="432" y="148">
                        a
                    </text>
                    <text textAnchor="middle" x="440" y="148">
                        d
                    </text>
                    <text textAnchor="middle" x="448" y="148">
                        i
                    </text>
                    <text textAnchor="middle" x="456" y="148">
                        n
                    </text>
                    <text textAnchor="middle" x="464" y="148">
                        g
                    </text>
                    <text textAnchor="middle" x="368" y="260">
                        T
                    </text>
                    <text textAnchor="middle" x="376" y="260">
                        o
                    </text>
                    <text textAnchor="middle" x="384" y="260">
                        n
                    </text>
                    <text textAnchor="middle" x="392" y="260">
                        e
                    </text>
                    <text textAnchor="middle" x="408" y="260">
                        m
                    </text>
                    <text textAnchor="middle" x="416" y="260">
                        a
                    </text>
                    <text textAnchor="middle" x="424" y="260">
                        p
                    </text>
                    <text textAnchor="middle" x="432" y="260">
                        p
                    </text>
                    <text textAnchor="middle" x="440" y="260">
                        i
                    </text>
                    <text textAnchor="middle" x="448" y="260">
                        n
                    </text>
                    <text textAnchor="middle" x="456" y="260">
                        g
                    </text>
                    <text textAnchor="middle" x="576" y="356">
                        P
                    </text>
                    <text textAnchor="middle" x="584" y="356">
                        i
                    </text>
                    <text textAnchor="middle" x="592" y="356">
                        x
                    </text>
                    <text textAnchor="middle" x="600" y="356">
                        e
                    </text>
                    <text textAnchor="middle" x="608" y="356">
                        l
                    </text>
                    <text textAnchor="middle" x="400" y="372">
                        O
                    </text>
                    <text textAnchor="middle" x="408" y="372">
                        E
                    </text>
                    <text textAnchor="middle" x="416" y="372">
                        T
                    </text>
                    <text textAnchor="middle" x="424" y="372">
                        F
                    </text>
                    <text textAnchor="middle" x="576" y="372">
                        v
                    </text>
                    <text textAnchor="middle" x="584" y="372">
                        a
                    </text>
                    <text textAnchor="middle" x="592" y="372">
                        l
                    </text>
                    <text textAnchor="middle" x="600" y="372">
                        u
                    </text>
                    <text textAnchor="middle" x="608" y="372">
                        e
                    </text>
                    <text textAnchor="middle" x="576" y="388">
                        (
                    </text>
                    <text textAnchor="middle" x="584" y="388">
                        L
                    </text>
                    <text textAnchor="middle" x="592" y="388">
                        D
                    </text>
                    <text textAnchor="middle" x="600" y="388">
                        R
                    </text>
                    <text textAnchor="middle" x="608" y="388">
                        )
                    </text>
                </g> */}
                <text textAnchor="middle" x="64" y="20">
                    Scene
                </text>
                <text textAnchor="middle" x="236" y="20">
                    Normalized
                </text>
                <text textAnchor="middle" x="64" y="36">
                    Luminance
                </text>
                <text textAnchor="middle" x="236" y="36">
                    Luminance
                </text>
                <text textAnchor="middle" x="416" y="36">
                    White Balance
                </text>
                <text textAnchor="middle" x="236" y="52">
                    (HDR)
                </text>
                <text textAnchor="middle" x="400" y="148">
                    Color Grading
                </text>
                <text textAnchor="middle" x="400" y="260">
                    Tone Mapping
                </text>
                <text textAnchor="middle" x="576" y="356">
                    Pixel
                </text>
                <text textAnchor="middle" x="408" y="372">
                    OETF
                </text>
                <text textAnchor="middle" x="592" y="372">
                    Value
                </text>
                <text textAnchor="middle" x="592" y="388">
                    (LDR)
                </text>
            </g>
        </svg>
    )
}
