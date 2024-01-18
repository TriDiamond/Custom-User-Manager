package com.intelizign.polarion.custom_user_management.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.intelizign.polarion.custom_user_management.service.CustomUserManagementService;
import com.polarion.core.util.logging.Logger;

public class CustomUserManagementServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(CustomUserManagementServlet.class);
	private CustomUserManagementService cuUserManagementGetService = new CustomUserManagementService();

	/**
	 * 
	 */
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

	
		String action = req.getParameter("action");
		try {
			if ((action != null)) {
				if (action.equalsIgnoreCase("getUserDetails")) {
					cuUserManagementGetService.getUserDetails(req, resp);
				} else {
					log.info("Trigerred Action is Empty!");
				}
			}
		} catch (Exception e) {
			log.error("Exception is" + e.getMessage());
		}
		if (action == null) {
			getServletContext().getRequestDispatcher("/static/index.html").forward(req, resp);
		}
	}

}
