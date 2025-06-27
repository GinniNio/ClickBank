class AnalyticsService {
    constructor() {
        this.events = [];
        this.pageViews = [];
        this.conversions = [];
    }

    // Track page views
    trackPageView(req) {
        const pageView = {
            timestamp: new Date(),
            url: req.url,
            userAgent: req.get('User-Agent'),
            ip: req.ip || req.connection.remoteAddress,
            referrer: req.get('Referrer') || 'direct',
            sessionId: req.sessionID || 'anonymous'
        };
        
        this.pageViews.push(pageView);
        
        // In production, you'd send this to your analytics service
        console.log('Page view tracked:', pageView.url);
        
        return pageView;
    }

    // Track custom events
    trackEvent(eventName, data = {}, req = null) {
        const event = {
            timestamp: new Date(),
            event: eventName,
            data: data,
            sessionId: req?.sessionID || 'anonymous',
            ip: req?.ip || req?.connection?.remoteAddress || 'unknown'
        };
        
        this.events.push(event);
        
        console.log('Event tracked:', eventName, data);
        
        return event;
    }

    // Track conversions (purchases, subscriptions, etc.)
    trackConversion(type, value = 0, data = {}, req = null) {
        const conversion = {
            timestamp: new Date(),
            type: type,
            value: value,
            data: data,
            sessionId: req?.sessionID || 'anonymous',
            ip: req?.ip || req?.connection?.remoteAddress || 'unknown'
        };
        
        this.conversions.push(conversion);
        
        console.log('Conversion tracked:', type, value, data);
        
        return conversion;
    }

    // Get analytics summary
    getAnalyticsSummary(days = 30) {
        const since = new Date();
        since.setDate(since.getDate() - days);
        
        const recentPageViews = this.pageViews.filter(pv => pv.timestamp >= since);
        const recentEvents = this.events.filter(e => e.timestamp >= since);
        const recentConversions = this.conversions.filter(c => c.timestamp >= since);
        
        return {
            period: `Last ${days} days`,
            pageViews: {
                total: recentPageViews.length,
                unique: new Set(recentPageViews.map(pv => pv.sessionId)).size,
                byUrl: this.groupBy(recentPageViews, 'url')
            },
            events: {
                total: recentEvents.length,
                byType: this.groupBy(recentEvents, 'event')
            },
            conversions: {
                total: recentConversions.length,
                totalValue: recentConversions.reduce((sum, c) => sum + c.value, 0),
                byType: this.groupBy(recentConversions, 'type')
            },
            topReferrers: this.getTopReferrers(recentPageViews),
            conversionRate: recentPageViews.length > 0 ? 
                (recentConversions.length / recentPageViews.length * 100).toFixed(2) + '%' : '0%'
        };
    }

    // Helper method to group data
    groupBy(array, key) {
        return array.reduce((result, item) => {
            const group = item[key];
            if (!result[group]) {
                result[group] = 0;
            }
            result[group]++;
            return result;
        }, {});
    }

    // Get top referrers
    getTopReferrers(pageViews, limit = 10) {
        const referrers = this.groupBy(pageViews, 'referrer');
        return Object.entries(referrers)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit)
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});
    }

    // Track purchase attempts
    trackPurchaseAttempt(source, req) {
        return this.trackEvent('purchase_attempt', { source }, req);
    }

    // Track email subscriptions
    trackEmailSubscription(email, source, req) {
        return this.trackConversion('email_subscription', 0, { email, source }, req);
    }

    // Track successful purchases
    trackPurchase(amount, source, req) {
        return this.trackConversion('purchase', amount, { source }, req);
    }

    // Track FAQ interactions
    trackFAQInteraction(question, req) {
        return this.trackEvent('faq_interaction', { question }, req);
    }

    // Track scroll depth
    trackScrollDepth(percentage, req) {
        return this.trackEvent('scroll_depth', { percentage }, req);
    }

    // Export data for external analytics services
    exportData(format = 'json') {
        const data = {
            pageViews: this.pageViews,
            events: this.events,
            conversions: this.conversions,
            summary: this.getAnalyticsSummary()
        };

        if (format === 'csv') {
            // Convert to CSV format
            return this.convertToCSV(data);
        }

        return JSON.stringify(data, null, 2);
    }

    // Convert data to CSV format
    convertToCSV(data) {
        const csvData = [];
        
        // Page Views CSV
        csvData.push('Page Views');
        csvData.push('timestamp,url,userAgent,ip,referrer,sessionId');
        data.pageViews.forEach(pv => {
            csvData.push(`${pv.timestamp},${pv.url},"${pv.userAgent}",${pv.ip},${pv.referrer},${pv.sessionId}`);
        });
        
        csvData.push('');
        
        // Events CSV
        csvData.push('Events');
        csvData.push('timestamp,event,data,sessionId,ip');
        data.events.forEach(e => {
            csvData.push(`${e.timestamp},${e.event},"${JSON.stringify(e.data)}",${e.sessionId},${e.ip}`);
        });
        
        csvData.push('');
        
        // Conversions CSV
        csvData.push('Conversions');
        csvData.push('timestamp,type,value,data,sessionId,ip');
        data.conversions.forEach(c => {
            csvData.push(`${c.timestamp},${c.type},${c.value},"${JSON.stringify(c.data)}",${c.sessionId},${c.ip}`);
        });
        
        return csvData.join('\n');
    }

    // Clear old data (for memory management)
    clearOldData(daysToKeep = 90) {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - daysToKeep);
        
        this.pageViews = this.pageViews.filter(pv => pv.timestamp >= cutoff);
        this.events = this.events.filter(e => e.timestamp >= cutoff);
        this.conversions = this.conversions.filter(c => c.timestamp >= cutoff);
        
        console.log(`Cleared analytics data older than ${daysToKeep} days`);
    }
}

module.exports = new AnalyticsService(); 