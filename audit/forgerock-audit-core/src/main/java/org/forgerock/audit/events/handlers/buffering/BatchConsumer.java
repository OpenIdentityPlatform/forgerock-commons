/*
 * The contents of this file are subject to the terms of the Common Development and
 * Distribution License (the License). You may not use this file except in compliance with the
 * License.
 *
 * You can obtain a copy of the License at legal/CDDLv1.0.txt. See the License for the
 * specific language governing permission and limitations under the License.
 *
 * When distributing Covered Software, include this CDDL Header Notice in each file and include
 * the License file at legal/CDDLv1.0.txt. If applicable, add the following below the CDDL
 * Header, with the fields enclosed by brackets [] replaced by your own identifying
 * information: "Portions copyright [year] [name of copyright owner]".
 *
 * Copyright 2016 ForgeRock AS.
 */
package org.forgerock.audit.events.handlers.buffering;

import org.forgerock.json.JsonValue;
import org.forgerock.util.promise.Promise;

/**
 * Implementation is responsible for being able to build up a batch payload and to publish that payload.
 */
public interface BatchConsumer {

    /**
     * Adds an audit event to a batch payload.
     *
     * @param topic
     *         event topic
     * @param event
     *         event JSON payload
     * @param payload
     *         batch payload
     *
     * @throws BatchException
     *         indicates failure to add-to-batch
     */
    void addToBatch(String topic, JsonValue event, StringBuilder payload) throws BatchException;

    /**
     * Publishes the batch payload.
     *
     * @param payload
     *         batch payload
     *
     * @return a simple promise encapsulating any potential batch exception
     */
    Promise<Void, BatchException> publishBatch(String payload);

}
