<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" encoding="utf-8"/>

  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()">
        <xsl:sort select="@key"/>
      </xsl:apply-templates>
    </xsl:copy>
  </xsl:template>

  <xsl:template match=" @v | @amount">
    <xsl:attribute name="{name(.)}">
      <xsl:value-of select="format-number(number(.), '#.##')"/>
    </xsl:attribute>
  </xsl:template>

</xsl:stylesheet>
