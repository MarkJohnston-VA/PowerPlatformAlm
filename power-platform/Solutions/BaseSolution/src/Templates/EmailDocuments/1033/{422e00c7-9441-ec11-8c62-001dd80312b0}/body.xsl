<?xml version="1.0" ?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"><xsl:output method="text" indent="no"/><xsl:template match="/data"><![CDATA[<div data-wrapper="true" style="font-size:9pt;font-family:'Segoe UI','Helvetica Neue',sans-serif;">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<p>A Request has need assigned to your Facility.&nbsp;</p>

<p>The request can be found&nbsp;]]><xsl:choose><xsl:when test="incident/vhacrm_recordurl_text"><xsl:value-of select="incident/vhacrm_recordurl_text" /></xsl:when><xsl:otherwise></xsl:otherwise></xsl:choose><![CDATA[<br>
<br>
&nbsp;</p>
</div>
</div>
</div>
</div>]]></xsl:template></xsl:stylesheet>