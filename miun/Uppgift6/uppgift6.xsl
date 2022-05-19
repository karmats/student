<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h1>Statistik från bilannonser</h1>
                <h2>Bilar från 1999 och framåt</h2>
                <p>Antal bilar:
                    <xsl:value-of select="count(//ad[regyear>=1999])"/>
                </p>
                <p>Antal bilar med automat:
                    <xsl:value-of select="count(//ad[regyear>=1999]//adtext[contains(text(), 'automat')])"/>
                </p>
                <p>Genomsnittspris:
                    <xsl:value-of select="round(sum(//ad[regyear>=1999]/price) div count(//ad[regyear>=1999]))"/> kronor
                </p>
                <h2>Bilar före 1999</h2>
                <p>Antal bilar:
                    <xsl:value-of select="count(//ad[regyear&lt;1999])"/>
                </p>
                <p>Antal bilar med automat:
                    <xsl:value-of select="count(//ad[regyear&lt;1999]//adtext[contains(text(), 'automat')])"/>
                </p>
                <p>Genomsnittspris:
                    <xsl:value-of select="round(sum(//ad[regyear&lt;1999]/price) div count(//ad[regyear&lt;1999]))"/> kronor
                </p>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>