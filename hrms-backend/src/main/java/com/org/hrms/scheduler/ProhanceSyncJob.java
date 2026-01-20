package com.org.hrms.scheduler;

import com.org.hrms.model.ProductivityRecord;
import com.org.hrms.service.ProductivityService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class ProhanceSyncJob {
    private static final Logger logger = LoggerFactory.getLogger(ProhanceSyncJob.class);
    private final ProductivityService productivityService;
    private final Random random = new Random();

    // Run every day at 1 AM via cron "0 0 1 * * ?"
    // For demo/dev purposes, I'll also add a fixedDelay to see it run or trigger
    // manually
    // @Scheduled(cron = "0 0 1 * * ?")
    // Using fixedDelay for testing visibility in logs
    @Scheduled(fixedDelay = 600000)
    public void syncProductivity() {
        logger.info("Starting ProHance Sync Job...");

        // Mock data ingestion since we don't have real ProHance API
        // In real world, this would process a list of employees

        // Mock record with violation (Productivity < 70)
        ProductivityRecord record = new ProductivityRecord();
        record.setEmployeeId(1L); // Assuming employee 1 exists
        record.setWorkDate(LocalDate.now());
        record.setProductivityPercent(50 + random.nextInt(40)); // Random 50-90

        logger.info("Syncing record for Employee 1 with score: {}", record.getProductivityPercent());

        try {
            productivityService.processRecord(record);
        } catch (Exception e) {
            logger.error("Error processing record", e);
        }
    }
}
