<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h1>Fordonsannonser</h1>
                <xsl:apply-templates select="//ad" />
            </body>
        </html>
    </xsl:template>
    <xsl:template match="ad">
        <h2>
            <xsl:value-of select="name" />&#160;
            <xsl:value-of select="model" />,
            <xsl:value-of select="regyear" />,
            <xsl:value-of select="price" />:-
        </h2>
        <p>
            <xsl:value-of select="adtext" />
        </p>
    </xsl:template>
</xsl:stylesheet>