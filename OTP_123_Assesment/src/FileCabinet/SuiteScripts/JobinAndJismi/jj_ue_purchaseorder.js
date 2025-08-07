/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log'],

    (record,log) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

         

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {
           
          try {
             const vendorId = 1894
                let purchaseOrder = record.create({
                    type: record.Type.PURCHASE_ORDER,
                    isDynamic: true
                })

                purchaseOrder.setValue({
                    fieldId: 'entity',
                    value:vendorId ,
                    ignoreFieldChange: true

                })

                purchaseOrder.setValue({
                    fieldId: 'subsidiary',
                    value: 1,
                    ignoreFieldChange: true
                })

                purchaseOrder.selectNewLine({ sublistId: 'item' })
                purchaseOrder.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value: 879

                })

                purchaseOrder.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: 4

                })




                purchaseOrder.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    value: 100

                })




                purchaseOrder.commitLine({ sublistId: 'item' })

                const purchaseOrderId = purchaseOrder.save({
                    enableSourcing: true,

                    ignoreMandatoryFields: true
                })

                log.debug("purchase order created succesfully",purchaseOrderId )

            } catch (error) {
                log.debug("error in creating purchase order" + error.message)
            }

        }

        return { beforeLoad, beforeSubmit, afterSubmit }

    });
