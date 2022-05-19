<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h1>Fordonsannonser för Suzuki</h1>
                <xsl:apply-templates select="//ad[contains(name, 'Suzuki')]" >
                    <xsl:sort select="price" order="ascending" data-type="number" />
                </xsl:apply-templates>
            </body>
        </html>
    </xsl:template>
    <xsl:template match="ad">
        <p>
            <xsl:value-of select="position()" />.
            <xsl:value-of select="name" />&#160;-
            <xsl:value-of select="model" />,
            <xsl:value-of select="regyear" />-modell,
            <xsl:value-of select="price" /> kronor
        </p>
    </xsl:template>
</xsl:stylesheet>