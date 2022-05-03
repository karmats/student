<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h1>Bilannonser</h1>
                <p>Antal bilar: <xsl:value-of select="count(//ad[type=2])"/></p>
                <p>Totalpris: <xsl:value-of select="sum(//ad[type=2]/price)"/>:-</p>
                <xsl:for-each select="//ad">
                    <xsl:if test="type=2">
                        <h2>
                            <xsl:value-of select="name" />&#160;
                            <xsl:value-of select="model" />
                        </h2>
                        <p>
                            <xsl:value-of select="adtext" />
                        </p>
                    </xsl:if>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>