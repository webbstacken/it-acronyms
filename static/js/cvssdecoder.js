/**
 * CVSS Decoder Class
 * 
 * This class provides functionality to decode and explain Common Vulnerability Scoring System (CVSS) strings
 * for versions 2.0, 3.0, 3.1, and 4.0.
 * 
 * References:
 * - CVSS v2.0: https://www.first.org/cvss/v2/guide
 * - CVSS v3.0: https://www.first.org/cvss/v3.0/specification-document
 * - CVSS v3.1: https://www.first.org/cvss/v3.1/specification-document
 * - CVSS v4.0: https://www.first.org/cvss/v4.0/specification-document
 * 
 * AI Assistance Notice:
 * This code was primarily developed with assistance from GitHub Copilot.
 * The AI helped with:
 * - Overall class structure and organization
 * - Implementing CVSS parsing logic
 * - Creating comprehensive metric descriptions
 * - Error handling and input validation
 * - Documentation and code formatting
 * 
 * See ATTRIBUTION.md for detailed information about AI contributions.
 */
class CVSSDecoder {
    #metricNames = {
        '2.0': {
            AV: "Attack Vector",
            AC: "Access Complexity",
            Au: "Authentication",
            C: "Confidentiality Impact",
            I: "Integrity Impact",
            A: "Availability Impact"
        },
        '3.0': {
            AV: "Attack Vector",
            AC: "Attack Complexity",
            PR: "Privileges Required",
            UI: "User Interaction",
            S: "Scope",
            C: "Confidentiality Impact",
            I: "Integrity Impact",
            A: "Availability Impact"
        },
        '3.1': {
            AV: "Attack Vector",
            AC: "Attack Complexity",
            PR: "Privileges Required",
            UI: "User Interaction",
            S: "Scope",
            C: "Confidentiality Impact",
            I: "Integrity Impact",
            A: "Availability Impact"
        },
        '4.0': {
            AV: "Attack Vector",
            AC: "Attack Complexity",
            AT: "Attack Requirements",
            PR: "Privileges Required",
            UI: "User Interaction",
            VC: "Vulnerable Component Confidentiality",
            VI: "Vulnerable Component Integrity",
            VA: "Vulnerable Component Availability",
            SC: "Subsequent Component Confidentiality",
            SI: "Subsequent Component Integrity",
            SA: "Subsequent Component Availability",
            S: "Safety Impact",
            MSM: "Macroscopic Security Measurement",
            E: "Exploit Maturity",
            CR: "Confidentiality Requirement",
            IR: "Integrity Requirement",
            AR: "Availability Requirement"
        }
    };

    decode(cvssString) {
        const version = this.getVersion(cvssString);
        let result;
        switch (version) {
            case '2.0':
                result = this.decodeCVSS2(cvssString);
                break;
            case '3.0':
            case '3.1':
                result = this.decodeCVSS3(cvssString);
                break;
            case '4.0':
                result = this.decodeCVSS4(cvssString);
                break;
            default:
                throw new Error('Unsupported CVSS version');
        }
        return this.formatResult(cvssString, result);
    }

    getVersion(cvssString) {
        if (cvssString.startsWith('CVSS:2.0')) return '2.0';
        if (cvssString.startsWith('CVSS:3.0')) return '3.0';
        if (cvssString.startsWith('CVSS:3.1')) return '3.1';
        if (cvssString.startsWith('CVSS:4.0')) return '4.0';
        throw new Error('Invalid CVSS string');
    }

    getMetricName(key, version) {
        return this.#metricNames[version][key] || key;
    }

    formatResult(cvssString, result) {
        let formattedResult = `${cvssString}\n\n`;
        for (const [key, metric] of Object.entries(result.metrics)) {
            const [shortDesc, longDesc] = metric.description.split('.');
            formattedResult += `(${key}:${metric.value}) ${this.getMetricName(key, result.version)}: ${shortDesc}\n${longDesc.trim()}\n\n`;
        }
        return formattedResult.trim();
    }
    decodeCVSS2(cvssString) {
        const metrics = cvssString.split('/');
        const result = {
            version: '2.0',
            metrics: {}
        };
        metrics.slice(1).forEach(metric => {
            const [key, value] = metric.split(':');
            result.metrics[key] = {
                value: value,
                description: this.getCVSS2Description(key, value)
            };
        });
        return result;
    }

    decodeCVSS3(cvssString) {
        const metrics = cvssString.split('/');
        const result = {
            version: cvssString.startsWith('CVSS:3.0') ? '3.0' : '3.1',
            metrics: {}
        };
        metrics.slice(1).forEach(metric => {
            const [key, value] = metric.split(':');
            result.metrics[key] = {
                value: value,
                description: this.getCVSS3Description(key, value)
            };
        });
        return result;
    }

    decodeCVSS4(cvssString) {
        const metrics = cvssString.split('/');
        const result = {
            version: '4.0',
            metrics: {}
        };
        metrics.slice(1).forEach(metric => {
            const [key, value] = metric.split(':');
            result.metrics[key] = {
                value: value,
                description: this.getCVSS4Description(key, value)
            };
        });
        return result;
    }

    getCVSS2Description(key, value) {
        const descriptions = {
            AV: {
                N: "Network. A vulnerability exploitable with network access means the vulnerable software is bound to the network stack and the attacker does not require local network access or local access",
                A: "Adjacent. A vulnerability exploitable with adjacent network access means the attacker must have access to either the broadcast or collision domain of the vulnerable software",
                L: "Local. A vulnerability exploitable with local access means the attacker must have either physical or logical access to the affected system"
            },
            AC: {
                H: "High. Specialized access conditions exist",
                M: "Medium. The access conditions are somewhat specialized",
                L: "Low. Specialized access conditions or extenuating circumstances do not exist"
            },
            Au: {
                M: "Multiple. Exploitation of the vulnerability requires that the attacker authenticate two or more times",
                S: "Single. Exploitation of the vulnerability requires that the attacker authenticate once",
                N: "None. Authentication is not required to exploit the vulnerability"
            },
            C: {
                N: "None. There is no impact to the confidentiality of the system",
                P: "Partial. There is considerable informational disclosure",
                C: "Complete. There is total information disclosure"
            },
            I: {
                N: "None. There is no impact to the integrity of the system",
                P: "Partial. Modification of some system files or information is possible",
                C: "Complete. Total compromise of system integrity is possible"
            },
            A: {
                N: "None. There is no impact to the availability of the system",
                P: "Partial. Reduced performance or interruptions in resource availability",
                C: "Complete. Total shutdown of the affected resource"
            }
        };
        return descriptions[key] ? descriptions[key][value] : 'Unknown';
    }

    getCVSS3Description(key, value) {
        const descriptions = {
            AV: {
                N: "Network. The vulnerability is exploitable with network access",
                A: "Adjacent. The vulnerability is exploitable with adjacent network access",
                L: "Local. The vulnerability is exploitable with local access",
                P: "Physical. The vulnerability is exploitable with physical access"
            },
            AC: {
                H: "High. Specialized access conditions exist",
                L: "Low. Specialized access conditions or extenuating circumstances do not exist"
            },
            PR: {
                N: "None. The attacker does not require any privileges",
                L: "Low. The attacker requires low privileges",
                H: "High. The attacker requires high privileges"
            },
            UI: {
                N: "None. The vulnerability can be exploited without any user interaction",
                R: "Required. The vulnerability requires user interaction to be exploited"
            },
            S: {
                U: "Unchanged. The scope of the vulnerability is unchanged",
                C: "Changed. The scope of the vulnerability is changed"
            },
            C: {
                N: "None. There is no impact to the confidentiality of the system",
                L: "Low. There is limited impact to the confidentiality of the system",
                H: "High. There is significant impact to the confidentiality of the system"
            },
            I: {
                N: "None. There is no impact to the integrity of the system",
                L: "Low. There is limited impact to the integrity of the system",
                H: "High. There is significant impact to the integrity of the system"
            },
            A: {
                N: "None. There is no impact to the availability of the system",
                L: "Low. There is limited impact to the availability of the system",
                H: "High. There is significant impact to the availability of the system"
            }
        };
        return descriptions[key] ? descriptions[key][value] : 'Unknown';
    }

    getCVSS4Description(key, value) {
        const descriptions = {
            AV: {
                N: "Network (N). The vulnerable system is bound to the network stack and the attacker's path is through OSI layer 3",
                A: "Adjacent (A). The vulnerable component is bound to the network stack, but the attack is limited to the same shared physical or logical network",
                L: "Local (L). The vulnerable component is not bound to the network stack and the attacker's path is via read/write/execute capabilities",
                P: "Physical (P). The attack requires the attacker to physically touch or manipulate the vulnerable component"
            },
            AC: {
                L: "Low (L). There are no special conditions for exploiting the vulnerability",
                H: "High (H). A successful attack requires the attacker to invest in significant effort to prepare or execute the attack"
            },
            AT: {
                N: "None (N). Specialized tools or expertise are not required",
                P: "Present (P). Specialized tools, expertise, or resources are required"
            },
            PR: {
                N: "None (N). The attacker does not require any privileges",
                L: "Low (L). The attacker requires low privileges",
                H: "High (H). The attacker requires high privileges"
            },
            UI: {
                N: "None (N). The vulnerability can be exploited without any user interaction",
                P: "Passive (P). The vulnerability requires passive user interaction",
                A: "Active (A). The vulnerability requires active user interaction"
            },
            VC: {
                H: "High (H). There is total loss of confidentiality, resulting in all resources within the impacted component being disclosed",
                L: "Low (L). There is some loss of confidentiality",
                N: "None (N). There is no loss of confidentiality within the impacted component"
            },
            VI: {
                H: "High (H). There is total loss of integrity within the impacted component",
                L: "Low (L). There is some loss of integrity",
                N: "None (N). There is no loss of integrity within the impacted component"
            },
            VA: {
                H: "High (H). There is total loss of availability within the impacted component",
                L: "Low (L). There is some loss of availability",
                N: "None (N). There is no loss of availability within the impacted component"
            },
            SC: {
                H: "High (H). There is total loss of security in resources managed by other components",
                L: "Low (L). There is some loss of security beyond the impacted component",
                N: "None (N). There is no impact to security beyond the impacted component"
            },
            SI: {
                H: "High (H). There is total loss of integrity in resources managed by other components",
                L: "Low (L). There is some loss of integrity beyond the impacted component",
                N: "None (N). There is no impact to integrity beyond the impacted component"
            },
            SA: {
                H: "High (H). There is total loss of availability in resources managed by other components",
                L: "Low (L). There is some loss of availability beyond the impacted component",
                N: "None (N). There is no impact to availability beyond the impacted component"
            },
            S: {
                H: "High (H). There is total loss of safety, resulting in unsafe operation",
                L: "Low (L). There is some loss of safety",
                N: "None (N). There is no loss of safety"
            },
            MSM: {
                C: "Critical. Worst-case impact significantly exceeds highest severity of base metrics",
                H: "High. Worst-case impact is high but does not significantly exceed highest base metric",
                L: "Low. Worst-case impact is low",
                N: "None. No additional impact beyond base metrics"
            }
        };
        return descriptions[key] ? descriptions[key][value] : 'Unknown';
    }
}